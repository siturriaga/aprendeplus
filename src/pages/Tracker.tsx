import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { useFirebase } from '../providers/FirebaseProvider';
import { StudentRecord } from '../lib/types';
import { tierFromAverage } from '../lib/tracker';
import toast from 'react-hot-toast';

interface PeriodGroup {
  period: string;
  students: StudentRecord[];
}

export function Tracker() {
  const { db, user } = useFirebase();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [activePeriod, setActivePeriod] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const studentsRef = collection(db, 'users', user.uid, 'roster_students');
    const q = query(studentsRef, orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as StudentRecord)
      }));
      setStudents(records);
      if (!activePeriod && records.length > 0) {
        setActivePeriod(records[0].period);
      }
    });
    return unsubscribe;
  }, [db, user, activePeriod]);

  const grouped = useMemo<PeriodGroup[]>(() => {
    const map = new Map<string, StudentRecord[]>();
    students.forEach((student) => {
      const periodGroup = map.get(student.period) ?? [];
      periodGroup.push(student);
      map.set(student.period, periodGroup);
    });
    return Array.from(map.entries()).map(([period, roster]) => ({ period, students: roster }));
  }, [students]);

  const handleScoreUpdate = async (
    student: StudentRecord,
    testName: string,
    value: string
  ) => {
    if (!user) return;
    const score = Number(value);
    if (Number.isNaN(score) || score < 0 || score > 100) {
      toast.error('Enter a score between 0 and 100');
      return;
    }
    const ref = doc(db, 'users', user.uid, 'roster_students', student.id);
    const testScores = { ...(student.testScores ?? {}), [testName]: score };
    const avg = Object.values(testScores).reduce((sum, s) => sum + s, 0) / Object.keys(testScores).length;
    await updateDoc(ref, {
      testScores,
      avgScore: avg,
      latestTest: testName,
      performanceTier: tierFromAverage(avg)
    });
    toast.success('Score updated');
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-wrap items-center gap-3">
          {grouped.map(({ period }) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                activePeriod === period
                  ? 'bg-gradient-to-r from-royal to-gold text-slate-900 shadow-glass'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Period {period}
            </button>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
            <thead className="bg-white/10 text-xs uppercase tracking-[0.3em] text-slate-300">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Latest Test</th>
                <th className="px-4 py-3">Average</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">Update Score</th>
              </tr>
            </thead>
            <tbody>
              {grouped
                .find((group) => group.period === activePeriod)?.students.map((student) => (
                  <tr key={student.id} className="odd:bg-white/5">
                    <td className="px-4 py-3 font-medium text-white">{student.name}</td>
                    <td className="px-4 py-3 text-slate-300">{student.latestTest ?? '—'}</td>
                    <td className="px-4 py-3 font-semibold text-gold">
                      {student.avgScore?.toFixed(1) ?? '0.0'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                          student.performanceTier === 'High'
                            ? 'bg-emerald-500/20 text-emerald-200'
                            : student.performanceTier === 'Medium'
                            ? 'bg-amber-500/20 text-amber-200'
                            : 'bg-rose-500/20 text-rose-200'
                        }`}
                      >
                        {student.performanceTier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input
                          defaultValue={student.avgScore?.toFixed(0) ?? ''}
                          type="number"
                          min={0}
                          max={100}
                          onBlur={(event) =>
                            handleScoreUpdate(
                              student,
                              student.latestTest ?? 'Benchmark',
                              event.target.value
                            )
                          }
                          className="w-24 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white focus:border-gold focus:outline-none"
                        />
                        <span className="text-xs text-slate-400">Press Tab to save</span>
                      </div>
                    </td>
                  </tr>
                )) ?? (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-400" colSpan={5}>
                      Import a roster to begin tracking live performance.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
