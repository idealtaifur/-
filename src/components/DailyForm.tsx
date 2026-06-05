import { useState, useEffect } from 'react';
import { DailyLog } from '../types';
import { Card, CardHeader, CardTitle } from './Card';
import { Check, Plus, Minus } from 'lucide-react';

interface DailyFormProps {
  todayLog: DailyLog;
  onSave: (log: DailyLog) => void;
}

export function DailyForm({ todayLog, onSave }: DailyFormProps) {
  const [log, setLog] = useState<DailyLog>(todayLog);

  useEffect(() => {
    setLog(todayLog);
  }, [todayLog]);

  const handleChange = (field: keyof DailyLog, value: string | number) => {
    setLog(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(log);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Update Today's Stats</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Water */}
        <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50">
          <div>
             <label className="block text-sm font-bold text-slate-700">Water</label>
             <p className="text-xs text-slate-400">Glasses today</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={() => handleChange('water', Math.max(0, log.water - 1))}
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-100 rounded-full text-slate-600 transition-colors shadow-sm"
            >
              <Minus size={18} />
            </button>
            <span className="w-8 text-center text-xl font-bold">{log.water}</span>
            <button 
              type="button"
              onClick={() => handleChange('water', log.water + 1)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-100 rounded-full text-slate-600 transition-colors shadow-sm"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Steps */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Steps</label>
          <input 
            type="number" 
            value={log.steps || ''}
            onChange={(e) => handleChange('steps', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold text-slate-700"
            placeholder="e.g. 5000"
          />
        </div>

        {/* Sleep */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Sleep (hrs)</label>
            <input 
              type="number" 
              step="0.5"
              value={log.sleep || ''}
              onChange={(e) => handleChange('sleep', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold text-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Weight (kg)</label>
            <input 
              type="number" 
              step="0.1"
              value={log.weight || ''}
              onChange={(e) => handleChange('weight', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all font-bold text-slate-700"
              placeholder="Opt."
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            disabled={JSON.stringify(log) === JSON.stringify(todayLog)}
          >
            <Check size={20} />
            Update Day
          </button>
        </div>
      </form>
    </Card>
  );
}
