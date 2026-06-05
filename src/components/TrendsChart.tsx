import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from './Card';
import { CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import { DailyLog } from '../types';
import { format, parseISO } from 'date-fns';

interface TrendsChartProps {
  logs: Record<string, DailyLog>;
}

export function TrendsChart({ logs }: TrendsChartProps) {
  const chartData = useMemo(() => {
    // Get last 7 days of data, sorted
    const limit = 7;
    const sortedDates = Object.keys(logs).sort();
    const recentDates = sortedDates.slice(-limit);
    
    return recentDates.map(dateStr => {
      const data = logs[dateStr];
      return {
        ...data,
        displayDate: format(parseISO(dateStr), 'MMM d')
      };
    });
  }, [logs]);

  if (chartData.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-slate-400">
          <p className="font-bold">No data to show trends.</p>
          <p className="text-sm mt-1">Start tracking to see your progress!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      
      <div className="flex-1 min-h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="displayDate" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px', fontWeight: 'bold' }}
              itemStyle={{ fontWeight: 'bold' }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="steps" 
              stroke="#10B981" 
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Steps"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="water" 
              stroke="#0EA5E9" 
              strokeWidth={4}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="Water (gl)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
