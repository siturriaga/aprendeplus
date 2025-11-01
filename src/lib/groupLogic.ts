import { StudentRecord } from './types';

export interface GroupResult {
  id: string;
  period: string;
  members: StudentRecord[];
  composition: 'Heterogeneous';
  average: number;
}

export function generateHeterogeneousGroups(
  students: StudentRecord[],
  desiredSize = 5
): GroupResult[] {
  if (!students.length) return [];

  const sorted = [...students].sort((a, b) => b.avgScore - a.avgScore);
  const groupCount = Math.max(1, Math.round(sorted.length / desiredSize));
  const groups: GroupResult[] = Array.from({ length: groupCount }, (_, idx) => ({
    id: `group-${idx + 1}`,
    period: students[0].period,
    members: [],
    composition: 'Heterogeneous',
    average: 0
  }));

  const tiers = {
    high: sorted.filter((student) => student.performanceTier === 'High'),
    medium: sorted.filter((student) => student.performanceTier === 'Medium'),
    low: sorted.filter((student) => student.performanceTier === 'Low')
  };

  const cycleInsert = (pool: StudentRecord[]) => {
    let index = 0;
    pool.forEach((student) => {
      groups[index % groups.length].members.push(student);
      index += 1;
    });
  };

  cycleInsert(tiers.high);
  cycleInsert(tiers.medium);
  cycleInsert(tiers.low);

  const leftovers = sorted.filter(
    (student) => !groups.some((group) => group.members.includes(student))
  );
  cycleInsert(leftovers);

  groups.forEach((group) => {
    group.average =
      group.members.reduce((sum, student) => sum + student.avgScore, 0) /
      (group.members.length || 1);
  });

  return groups;
}
