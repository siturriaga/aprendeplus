import { Link, useRoute } from 'wouter';
import {
  LayoutDashboard,
  Users,
  BookOpenCheck,
  ClipboardList,
  Settings as SettingsIcon,
  Table2,
  PanelsTopLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/roster', label: 'Roster', icon: Users },
  { href: '/tracker', label: 'Live Tracker', icon: Table2 },
  { href: '/groups', label: 'DI Groups', icon: PanelsTopLeft },
  { href: '/standards', label: 'Standards', icon: BookOpenCheck },
  { href: '/assignments', label: 'Assignments', icon: ClipboardList },
  { href: '/settings', label: 'Settings', icon: SettingsIcon }
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="p-8 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-royal to-gold flex items-center justify-center">
            <span className="text-2xl font-display text-slate-900">S</span>
          </div>
          <div>
            <p className="text-xl font-display">Synapse</p>
            <p className="text-xs uppercase tracking-widest text-slate-300">
              Teacher Co-Pilot
            </p>
          </div>
        </motion.div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const [isActive] = useRoute(href === '/' ? '/' : `${href}`);
          return (
            <Link key={href} href={href}>
              <a
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 hover:bg-white/10 ${
                  isActive ? 'bg-white/15 text-white' : 'text-slate-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </a>
            </Link>
          );
        })}
      </nav>
      <div className="p-6 text-xs text-slate-400 border-t border-white/10">
        © {new Date().getFullYear()} Synapse Labs. All rights reserved.
      </div>
    </aside>
  );
}
