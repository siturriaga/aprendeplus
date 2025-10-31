import { functionsBaseUrl } from './firebase';

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function request<T>(
  path: string,
  options: RequestInit,
  token: string
): Promise<T> {
  const res = await fetch(`${functionsBaseUrl}/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {})
    }
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const body: ApiResponse<T> = await res.json();
  if (!body.ok) {
    throw new Error(body.error ?? 'Request failed');
  }
  return body.data as T;
}

export const api = {
  async uploadRoster(formData: FormData, token: string) {
    const res = await fetch(`${functionsBaseUrl}/uploadRoster`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const body: ApiResponse<{ preview: unknown[] }> = await res.json();
    if (!body.ok) throw new Error(body.error ?? 'Roster upload failed');
    return body.data;
  },
  async processRoster(payload: unknown, token: string) {
    return request<{ stats: { imported: number; periods: number } }>(
      'processRoster',
      {
        method: 'POST',
        body: JSON.stringify(payload)
      },
      token
    );
  },
  async generateGroups(payload: unknown, token: string) {
    return request<{ groups: any[] }>(
      'generateGroups',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    );
  },
  async saveAssignment(payload: unknown, token: string) {
    return request<{ id: string }>(
      'saveAssignment',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    );
  },
  async getAssignments(token: string) {
    return request<{ assignments: any[] }>(
      'getAssignments',
      { method: 'GET' },
      token
    );
  }
};
