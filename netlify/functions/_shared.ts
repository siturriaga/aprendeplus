import { HandlerEvent } from '@netlify/functions';
import { getFirebaseAdmin } from './firebaseAdmin';

export async function verifyRequest(event: HandlerEvent) {
  const authHeader = event.headers.authorization || event.headers.Authorization;
  if (!authHeader) {
    throw new Error('Missing authorization header');
  }
  const token = authHeader.replace('Bearer ', '');
  const { auth } = getFirebaseAdmin();
  const decoded = await auth.verifyIdToken(token);
  return decoded.uid;
}

export function ok<T>(data: T) {
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, data })
  };
}

export function fail(message: string, statusCode = 400) {
  return {
    statusCode,
    body: JSON.stringify({ ok: false, error: message })
  };
}
