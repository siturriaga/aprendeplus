import { doc, updateDoc } from 'firebase/firestore';
import { StudentRecord } from './types';
import { Firestore } from 'firebase/firestore';

export function calculateAverage(scores: Record<string, number>) {
  const values = Object.values(scores);
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function tierFromAverage(avg: number): 'High' | 'Medium' | 'Low' {
  if (avg >= 80) return 'High';
  if (avg >= 60) return 'Medium';
  return 'Low';
}

export async function updateStudentScore(
  db: Firestore,
  userId: string,
  student: StudentRecord,
  testName: string,
  score: number
) {
  const docRef = doc(db, 'users', userId, 'roster', 'students', student.id);
  const updatedScores = {
    ...(student.testScores ?? {}),
    [testName]: score
  };
  const avgScore = calculateAverage(updatedScores);
  await updateDoc(docRef, {
    testScores: updatedScores,
    avgScore,
    latestTest: testName,
    performanceTier: tierFromAverage(avgScore),
    lastUpdated: new Date().toISOString()
  });
}
