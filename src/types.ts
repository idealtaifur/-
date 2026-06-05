export interface DailyLog {
  date: string; // YYYY-MM-DD
  water: number; // in glasses
  steps: number;
  sleep: number; // in hours
  weight: number; // in kg optionally
}

export type HealthMetric = keyof Omit<DailyLog, 'date'>;
