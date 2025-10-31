import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useFirebase } from '../providers/FirebaseProvider';
import { AssignmentVersion } from '../lib/types';
import { motion } from 'framer-motion';
import { Printer, Layers } from 'lucide-react';

interface AssignmentRecord extends AssignmentVersion {
  id: string;
  assignedTo?: string[];
  dueDate?: string;
  status?: string;
  createdAt?: string;
}

export function Assignments() {
  const { db, user } = useFirebase();
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([]);

  useEffect(() => {
    if (!user) return;
    const assignmentsRef = collection(db, 'users', user.uid, 'assignments');
    const q = query(assignmentsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAssignments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as AssignmentRecord)
        }))
      );
    });
    return unsubscribe;
  }, [db, user]);

  const printable = useMemo(() => assignments, [assignments]);

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl">Assignments</h2>
            <p className="text-sm text-slate-300">
              Manage Support, Core, and Stretch tasks aligned to each standard.
            </p>
          </div>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              window.print();
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <Printer className="h-4 w-4" /> Print all
          </a>
        </div>
        <div className="mt-6 grid gap-4">
          {printable.map((assignment) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-white/10 bg-white/10 p-6 print:bg-white print:text-slate-900"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {assignment.difficulty}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white print:text-slate-900">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-slate-300 print:text-slate-700">
                    Standard {assignment.standard}
                  </p>
                </div>
                <div className="rounded-2xl bg-royal/20 px-4 py-2 text-sm text-gold">
                  {assignment.points} points
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-200 print:text-slate-800">
                {assignment.tasks.map((task, index) => (
                  <li key={index} className="rounded-2xl bg-white/10 p-3 print:border print:border-slate-200 print:bg-white">
                    {task}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-400 print:text-slate-700">
                {assignment.assignedTo && assignment.assignedTo.length > 0 && (
                  <span>{assignment.assignedTo.length} students assigned</span>
                )}
                {assignment.dueDate && <span>Due {assignment.dueDate}</span>}
                <span>Status: {assignment.status ?? 'Draft'}</span>
                {assignment.createdAt && (
                  <span>
                    Created {new Date(assignment.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {!assignments.length && (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
          <Layers className="mx-auto h-10 w-10 text-gold" />
          <p className="mt-4 text-lg font-medium text-white">
            Assignments generated from Standards will appear here instantly.
          </p>
        </div>
      )}
    </div>
  );
}
