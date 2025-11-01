export interface StudentRecord {
  id: string;
  name: string;
  period: string;
  quarter: string;
  avgScore: number;
  performanceTier: 'High' | 'Medium' | 'Low';
  latestTest?: string;
  standardsProgress?: number;
  testScores?: Record<string, number>;
  standardsScores?: Record<string, number>;
}

export interface AssignmentVersion {
  difficulty: 'Support' | 'Core' | 'Stretch';
  title: string;
  tasks: string[];
  points: number;
  standard: string;
}

export interface DashboardMetrics {
  totalEnrollment: number;
  avgPerformance: number;
  groupsCount: number;
  lastUpdated?: string;
}
