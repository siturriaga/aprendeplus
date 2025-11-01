import { motion } from 'framer-motion';
import { useFirebase } from '../providers/FirebaseProvider';

export function SignIn() {
  const { signIn } = useFirebase();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-royal/30 to-slate-950 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-md space-y-6 p-10"
      >
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-3xl bg-gradient-to-br from-royal to-gold flex items-center justify-center text-2xl font-display text-slate-900">
            S
          </div>
          <div>
            <p className="text-3xl font-display">Synapse</p>
            <p className="text-sm text-slate-200">
              Standards-Aligned Teacher Co-Pilot
            </p>
          </div>
        </div>
        <p className="text-slate-200">
          Welcome! Sign in with your district Google account to connect your
          rosters, standards, assignments, and groups in one powerful command
          center.
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => signIn()}
          className="w-full rounded-2xl bg-gradient-to-r from-royal to-gold py-3 text-lg font-semibold text-slate-900 shadow-glass"
        >
          Sign in with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
