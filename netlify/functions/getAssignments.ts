import { Handler } from '@netlify/functions';
import { getFirebaseAdmin } from './firebaseAdmin';
import { fail, ok, verifyRequest } from './_shared';

export const handler: Handler = async (event) => {
  try {
    const uid = await verifyRequest(event);
    const { db } = getFirebaseAdmin();
    const snapshot = await db
      .collection('users')
      .doc(uid)
      .collection('assignments')
      .orderBy('createdAt', 'desc')
      .get();

    const assignments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return ok({ assignments });
  } catch (error: any) {
    return fail(error.message ?? 'Unable to fetch assignments', 500);
  }
};
