import { Menu, Sun, MoonStar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFirebase } from '../../providers/FirebaseProvider';
import { useUiPreferences } from '../../providers/UiPreferencesProvider';
import { DynamicWelcome } from './DynamicWelcome';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'wouter';

export function Header() {
  const { user, signOutUser } = useFirebase();
  const { theme, toggleTheme } = useUiPreferences();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/">
            <a className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
              <Menu className="h-5 w-5" />
            </a>
          </Link>
          <DynamicWelcome displayName={user?.displayName ?? 'Teacher'} />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/20"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              await signOutUser();
              toast.success('Signed out successfully');
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-royal to-gold px-4 py-2 text-sm font-semibold text-slate-900 shadow-glass"
          >
            Sign out
          </motion.button>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName ?? 'User avatar'}
              className="h-12 w-12 rounded-full border-2 border-gold object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold">
              {user?.displayName?.slice(0, 1) ?? '?'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
