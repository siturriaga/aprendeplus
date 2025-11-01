import { Handler } from '@netlify/functions';
import { getFirebaseAdmin } from './firebaseAdmin';
import { fail, ok, verifyRequest } from './_shared';

export const handler: Handler = async (event) => {
  try {
    const uid = await verifyRequest(event);
    if (!event.body) {
      return fail('Missing payload', 400);
    }
    const assignment = JSON.parse(event.body);
    const { db } = getFirebaseAdmin();
    const assignments = db.collection('users').doc(uid).collection('assignments');
    const ref = await assignments.add({
      ...assignment,
      createdAt: new Date().toISOString(),
      status: assignment.status ?? 'Draft'
    });
    return ok({ id: ref.id });
  } catch (error: any) {
    return fail(error.message ?? 'Unable to save assignment', 500);
  }
};
