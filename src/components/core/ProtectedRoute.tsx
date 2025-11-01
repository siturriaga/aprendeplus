import { ReactNode } from 'react';
import { useFirebase } from '../../providers/FirebaseProvider';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-slate-300 animate-pulse">Loading Synapse…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
