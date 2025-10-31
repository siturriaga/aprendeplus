import { Handler } from '@netlify/functions';
import { getFirebaseAdmin } from './firebaseAdmin';
import { fail, ok, verifyRequest } from './_shared';

interface GroupPayload {
  id: string;
  period: string;
  members: string[];
  composition: 'Heterogeneous';
  average: number;
}

export const handler: Handler = async (event) => {
  try {
    const uid = await verifyRequest(event);
    if (!event.body) {
      return fail('Missing payload', 400);
    }
    const { period, groups } = JSON.parse(event.body) as {
      period: string;
      groups: GroupPayload[];
    };
    if (!period || !Array.isArray(groups)) {
      return fail('Invalid group payload', 400);
    }
    const { db } = getFirebaseAdmin();
    const userDoc = db.collection('users').doc(uid);
    const groupsCollection = userDoc.collection('groups');
    const batch = db.batch();

    groups.forEach((group) => {
      const docRef = groupsCollection.doc(group.id);
      batch.set(docRef, {
        period,
        members: group.members,
        composition: 'Heterogeneous',
        average: group.average,
        createdAt: new Date().toISOString()
      });
    });

    await batch.commit();

    await userDoc.collection('dashboard_stats').doc('metrics').set(
      {
        groupsCount: groups.length,
        lastUpdated: new Date().toISOString()
      },
      { merge: true }
    );

    return ok({ groupsCount: groups.length });
  } catch (error: any) {
    return fail(error.message ?? 'Unable to generate groups', 500);
  }
};
