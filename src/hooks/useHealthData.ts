import { useState, useEffect } from 'react';
import { DailyLog } from '../types';
import { format } from 'date-fns';

const LOCAL_STORAGE_KEY = 'health-tracker-data';

export function useHealthData() {
  const [logs, setLogs] = useState<Record<string, DailyLog>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        setLogs(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse health data', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveLog = (log: DailyLog) => {
    const newLogs = {
      ...logs,
      [log.date]: log,
    };
    setLogs(newLogs);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLogs));
  };

  const getLogByDate = (date: string): DailyLog => {
    return logs[date] || { date, water: 0, steps: 0, sleep: 0, weight: 0 };
  };

  const generateMockData = () => {
    const mock: Record<string, DailyLog> = {};
    const today = new Date();
    for (let i = 7; i > 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      mock[dateStr] = {
        date: dateStr,
        water: Math.floor(Math.random() * 5) + 3,
        steps: Math.floor(Math.random() * 6000) + 4000,
        sleep: parseFloat((Math.random() * 3 + 5).toFixed(1)),
        weight: parseFloat((70 + Math.random() * 2 - 1).toFixed(1)),
      };
    }
    setLogs(mock);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mock));
  };

  return { logs, isLoaded, saveLog, getLogByDate, generateMockData };
}
