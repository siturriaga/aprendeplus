import { Handler } from '@netlify/functions';
import { getFirebaseAdmin } from './firebaseAdmin';
import { fail, ok, verifyRequest } from './_shared';

type RosterRow = {
  id: string;
  name: string;
  period: string;
  quarter: string;
};

export const handler: Handler = async (event) => {
  try {
    const uid = await verifyRequest(event);
    if (!event.body) {
      return fail('Missing payload', 400);
    }
    const { rows } = JSON.parse(event.body) as { rows: RosterRow[] };
    if (!Array.isArray(rows)) {
      return fail('Invalid roster payload', 400);
    }
    const { db } = getFirebaseAdmin();
    const userDoc = db.collection('users').doc(uid);
    const rosterCollection = userDoc.collection('roster_students');
    const batch = db.batch();
    const existingDocs = await rosterCollection.get();
    const incomingIds = new Set(rows.map((row) => row.id));
    existingDocs.forEach((doc) => {
      if (!incomingIds.has(doc.id)) {
        batch.delete(doc.ref);
      }
    });

    rows.forEach((row) => {
      const docRef = rosterCollection.doc(row.id);
      batch.set(docRef, {
        name: row.name,
        period: row.period,
        quarter: row.quarter,
        createdAt: new Date().toISOString(),
        testScores: {},
        standardsScores: {},
        avgScore: 0,
        performanceTier: 'Medium'
      });
    });
    await batch.commit();

    const periods = Array.from(new Set(rows.map((row) => row.period)));

    const metricsDoc = await userDoc.collection('dashboard_stats').doc('metrics').get();
    const existingMetrics = metricsDoc.exists ? metricsDoc.data() : {};

    await userDoc.collection('dashboard_stats').doc('metrics').set(
      {
        totalEnrollment: rows.length,
        avgPerformance: existingMetrics?.avgPerformance ?? 0,
        groupsCount: existingMetrics?.groupsCount ?? 0,
        lastUpdated: new Date().toISOString()
      },
      { merge: true }
    );

    return ok({ stats: { imported: rows.length, periods: periods.length } });
  } catch (error: any) {
    return fail(error.message ?? 'Unable to process roster', 500);
  }
};
