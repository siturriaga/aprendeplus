import { useMemo, useState } from 'react';
import civics from '../../data/civics.7.json';
import history from '../../data/us_history.6.json';
import ela6 from '../../data/ela.6.json';
import ela7 from '../../data/ela.7.json';
import ela8 from '../../data/ela.8.json';
import { motion } from 'framer-motion';
import { BookOpen, PlusCircle } from 'lucide-react';
import { AssignmentVersion } from '../lib/types';
import { generateAssignmentVersions } from '../utils/assignmentGenerator';
import { useFirebase } from '../providers/FirebaseProvider';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

const standardsData = [
  { id: 'civics7', label: 'Civics · Grade 7', standards: civics },
  { id: 'history6', label: 'U.S. History · Grade 6', standards: history },
  { id: 'ela6', label: 'ELA · Grade 6', standards: ela6 },
  { id: 'ela7', label: 'ELA · Grade 7', standards: ela7 },
  { id: 'ela8', label: 'ELA · Grade 8', standards: ela8 }
];

interface StandardRecord {
  code: string;
  title: string;
  description: string;
}

export function Standards() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<StandardRecord | null>(null);
  const [assignmentPreview, setAssignmentPreview] = useState<AssignmentVersion[] | null>(null);
  const { user } = useFirebase();

  const standards = useMemo(() => {
    const all = standardsData.flatMap((group) =>
      group.standards.map((item) => ({ ...item, group: group.label }))
    );
    if (!query) return all;
    const q = query.toLowerCase();
    return all.filter(
      (standard) =>
        standard.code.toLowerCase().includes(q) ||
        standard.title.toLowerCase().includes(q) ||
        standard.description.toLowerCase().includes(q) ||
        standard.group.toLowerCase().includes(q)
    );
  }, [query]);

  const generatePreview = (standard: StandardRecord) => {
    const preview = generateAssignmentVersions(standard);
    setSelected(standard);
    setAssignmentPreview(preview);
  };

  const saveAssignments = async (versions: AssignmentVersion[]) => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      await Promise.all(versions.map((assignment) => api.saveAssignment(assignment, token)));
      toast.success('Assignments saved to Firestore');
    } catch (error: any) {
      toast.error(error.message ?? 'Unable to save assignments');
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl">Standards Explorer</h2>
            <p className="text-sm text-slate-300">
              Browse and search Florida standards. Generate differentiated assignments instantly.
            </p>
          </div>
          <input
            type="search"
            placeholder="Search standards, codes, or grade levels"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-gold focus:outline-none"
          />
        </div>
        <div className="mt-6 grid gap-4">
          {standards.map((standard) => (
            <motion.button
              key={standard.code}
              layout
              onClick={() => generatePreview(standard)}
              className="flex flex-col items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-gold/60"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-royal/30 p-3 text-gold">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {standard.group}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {standard.code} · {standard.title}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-300">{standard.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gold">
                <PlusCircle className="h-4 w-4" /> Generate assignment
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {assignmentPreview && selected && (
        <div className="glass-card space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Assignment Preview
              </p>
              <h3 className="mt-1 font-display text-2xl text-white">
                {selected.code} · {selected.title}
              </h3>
            </div>
            <button
              onClick={() => saveAssignments(assignmentPreview)}
              className="rounded-2xl bg-gradient-to-r from-royal to-gold px-6 py-3 text-sm font-semibold text-slate-900 shadow-glass"
            >
              Save all versions
            </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {assignmentPreview.map((assignment) => (
              <motion.div
                key={assignment.difficulty}
                initial={{ rotateY: 180, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-3xl border border-white/10 bg-white/10 p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {assignment.difficulty}
                </p>
                <h4 className="mt-2 font-semibold text-white">{assignment.title}</h4>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  {assignment.tasks.map((task, index) => (
                    <li key={index} className="rounded-2xl bg-white/10 p-3">
                      {task}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-400">{assignment.points} pts · {assignment.standard}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
