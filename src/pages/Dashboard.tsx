import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useFirebase } from '../providers/FirebaseProvider';
import { DashboardMetrics } from '../lib/types';
import { Sparkles, Users, BarChart3, Clock } from 'lucide-react';

const defaultMetrics: DashboardMetrics = {
  totalEnrollment: 0,
  avgPerformance: 0,
  groupsCount: 0,
  lastUpdated: undefined
};

export function Dashboard() {
  const { db, user } = useFirebase();
  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid, 'dashboard_stats', 'metrics'),
      (snapshot) => {
        if (snapshot.exists()) {
          setMetrics(snapshot.data() as DashboardMetrics);
        }
      }
    );
    return unsubscribe;
  }, [db, user]);

  const cards = [
    {
      title: 'Total Enrollment',
      value: metrics.totalEnrollment,
      description: 'Students across all periods',
      icon: Users
    },
    {
      title: 'Average Performance',
      value: `${metrics.avgPerformance.toFixed(1)}%`,
      description: 'Rolling 30-day average',
      icon: BarChart3
    },
    {
      title: 'Active Groups',
      value: metrics.groupsCount,
      description: 'Heterogeneous DI groups',
      icon: Sparkles
    },
    {
      title: 'Last Synced',
      value: metrics.lastUpdated
        ? new Date(metrics.lastUpdated).toLocaleString()
        : '–',
      description: 'Roster + assessments',
      icon: Clock
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, description, icon: Icon }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
                  {title}
                </p>
                <p className="mt-4 text-3xl font-display text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-300">{description}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 text-gold">
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
