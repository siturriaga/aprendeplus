import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore';
import { DragEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFirebase } from '../providers/FirebaseProvider';
import { StudentRecord } from '../lib/types';
import { generateHeterogeneousGroups, GroupResult } from '../lib/groupLogic';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import { Shuffle, Wand2 } from 'lucide-react';

interface FirestoreGroup {
  period: string;
  members: string[];
  composition?: string;
  average?: number;
}

export function Groups() {
  const { db, user } = useFirebase();
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [groups, setGroups] = useState<GroupResult[]>([]);
  const [period, setPeriod] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const studentsRef = collection(db, 'users', user.uid, 'roster_students');
    const q = query(studentsRef, orderBy('avgScore', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const records = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as StudentRecord) }));
      setStudents(records);
      if (!period && records.length > 0) {
        setPeriod(records[0].period);
      }
    });
    return unsubscribe;
  }, [db, user, period]);

  useEffect(() => {
    if (!user || !period) return;
    const groupsRef = collection(db, 'users', user.uid, 'groups');
    const q = query(groupsRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        pendingSync.current = false;
        setGroups([]);
        return;
      }

      const latest = snapshot.docs
        .map((docSnapshot) => {
          const data = docSnapshot.data() as FirestoreGroup;
          const members = (data.members ?? [])
            .map((memberId) => students.find((student) => student.id === memberId))
            .filter((student): student is StudentRecord => Boolean(student));

          const average =
            members.length > 0
              ? members.reduce((sum, member) => sum + member.avgScore, 0) / members.length
              : data.average ?? 0;

          const composition: GroupResult['composition'] = 'Heterogeneous';

          return {
            id: docSnapshot.id,
            period: data.period,
            composition,
            members,
            average
          } satisfies GroupResult;
        })
        .filter((group) => group.period === period);

      pendingSync.current = false;
      setGroups(latest);
    });
    return unsubscribe;
  }, [db, user, period, students]);

  const periodStudents = useMemo(
    () => students.filter((student) => student.period === period),
    [students, period]
  );

  const generateGroups = async () => {
    if (!user || !period) return;
    if (!periodStudents.length) {
      toast.error('Add students to this period before generating groups');
      return;
    }
    const generated = generateHeterogeneousGroups(periodStudents);
    setGroups(generated);
    try {
      const token = await user.getIdToken();
      await api.generateGroups(
        {
          period,
          groups: generated.map((group) => ({
            ...group,
            members: group.members.map((student) => student.id)
          }))
        },
        token
      );
      toast.success('Groups saved');
    } catch (error: any) {
      toast.error(error.message ?? 'Unable to save groups');
    }
  };

  const recalcAverages = useCallback(
    (updatedGroups: GroupResult[]) =>
      updatedGroups.map((group) => ({
        ...group,
        average:
          group.members.reduce((sum, member) => sum + member.avgScore, 0) /
          (group.members.length || 1)
      })),
    []
  );

  const pendingSync = useRef(false);

  const saveManualGroup = useCallback(
    async (group: GroupResult) => {
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'groups', group.id);
      const { members, id: _id, ...rest } = group;
      await setDoc(ref, {
        ...rest,
        members: members.map((student) => student.id),
        average:
          members.reduce((sum, student) => sum + student.avgScore, 0) /
          (members.length || 1),
        createdAt: new Date().toISOString()
      });
    },
    [db, user]
  );

  useEffect(() => {
    if (!user || !pendingSync.current) return;
    Promise.all(groups.map((group) => saveManualGroup(group))).catch(() => {
      toast.error('Unable to persist group changes');
    });
    pendingSync.current = false;
  }, [groups, saveManualGroup, user]);

  const handleDrop = (event: DragEvent<HTMLDivElement>, destinationId: string) => {
    event.preventDefault();
    const studentId = event.dataTransfer.getData('text/student');
    if (!studentId) return;
    setGroups((current) => {
      const sourceGroup = current.find((group) =>
        group.members.some((member) => member.id === studentId)
      );
      const destinationGroup = current.find((group) => group.id === destinationId);
      if (!sourceGroup || !destinationGroup) return current;
      if (sourceGroup.id === destinationId) return current;
      const student = sourceGroup.members.find((member) => member.id === studentId);
      if (!student) return current;

      const updated = current.map((group) => {
        if (group.id === sourceGroup.id) {
          return {
            ...group,
            members: group.members.filter((member) => member.id !== studentId)
          };
        }
        if (group.id === destinationGroup.id) {
          return {
            ...group,
            members: [...group.members, student]
          };
        }
        return group;
      });
      pendingSync.current = true;
      return recalcAverages(updated);
    });
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-2xl">Differentiated Groups</h2>
            <p className="text-sm text-slate-300">
              Synapse balances high, medium, and low performers for heterogeneous collaboration.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period ?? ''}
              onChange={(event) => setPeriod(event.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
            >
              {Array.from(new Set(students.map((student) => student.period))).map((periodOption) => (
                <option key={periodOption} value={periodOption} className="text-slate-900">
                  Period {periodOption}
                </option>
              ))}
            </select>
            <button
              onClick={generateGroups}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-royal to-gold px-5 py-3 text-sm font-semibold text-slate-900 shadow-glass"
            >
              <Shuffle className="h-4 w-4" /> Generate new groups
            </button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              layout
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, group.id)}
              className="rounded-3xl border border-white/10 bg-white/10 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Group {group.id.replace('group-', '')}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    Average {group.average.toFixed(1)}%
                  </h3>
                </div>
                <button
                  onClick={async () => {
                    await saveManualGroup(group);
                    toast.success('Group saved');
                  }}
                  className="rounded-2xl bg-white/10 px-3 py-1 text-xs text-slate-200"
                >
                  Save
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {group.members.map((student) => (
                  <div
                    key={student.id}
                    draggable
                    onDragStart={(event) =>
                      event.dataTransfer.setData('text/student', student.id)
                    }
                    className={`flex cursor-grab items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm transition hover:border-gold/60 ${
                      student.performanceTier === 'High'
                        ? 'bg-emerald-500/10 text-emerald-100'
                        : student.performanceTier === 'Medium'
                        ? 'bg-amber-500/10 text-amber-100'
                        : 'bg-rose-500/10 text-rose-100'
                    }`}
                  >
                    <span>{student.name}</span>
                    <span>{student.avgScore.toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        {!groups.length && (
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
            <Wand2 className="mx-auto h-10 w-10 text-gold" />
            <p className="mt-4 text-lg font-medium text-white">
              Generate groups to see balanced teams organized by Synapse intelligence.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
