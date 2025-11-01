import { useFirebase } from '../providers/FirebaseProvider';
import { useUiPreferences } from '../providers/UiPreferencesProvider';
import { motion } from 'framer-motion';
import { Shield, Accessibility, Palette } from 'lucide-react';

export function Settings() {
  const { user } = useFirebase();
  const { assistedMode, toggleAssistedMode, theme, toggleTheme } = useUiPreferences();

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <h2 className="font-display text-2xl">Settings</h2>
        <p className="mt-2 text-sm text-slate-300">
          Customize your Synapse experience with accessibility and appearance controls.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div
            whileHover={{ translateY: -4 }}
            className="rounded-3xl border border-white/10 bg-white/10 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-royal/20 p-3 text-gold">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Account</p>
                <p className="text-lg font-semibold text-white">{user?.displayName}</p>
                <p className="text-sm text-slate-300">{user?.email}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ translateY: -4 }}
            className="rounded-3xl border border-white/10 bg-white/10 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-royal/20 p-3 text-gold">
                  <Accessibility className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Assisted Mode</p>
                  <p className="text-sm text-slate-300">
                    Larger type, high contrast, and helpful hints.
                  </p>
                </div>
              </div>
              <button
                onClick={toggleAssistedMode}
                className={`rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition ${
                  assistedMode ? 'bg-gradient-to-r from-royal to-gold text-slate-900' : 'bg-white/10 text-slate-200'
                }`}
              >
                {assistedMode ? 'Enabled' : 'Enable'}
              </button>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ translateY: -4 }}
            className="rounded-3xl border border-white/10 bg-white/10 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-royal/20 p-3 text-gold">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Theme</p>
                  <p className="text-sm text-slate-300">Switch between light and dark for any environment.</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-slate-200"
              >
                {theme === 'dark' ? 'Dark' : 'Light'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
