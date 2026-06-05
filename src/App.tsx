import { useState, useMemo } from 'react';
import { useHealthData } from './hooks/useHealthData';
import { SummaryCards } from './components/SummaryCards';
import { DailyForm } from './components/DailyForm';
import { TrendsChart } from './components/TrendsChart';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

export default function App() {
  const { logs, isLoaded, saveLog, getLogByDate, generateMockData } = useHealthData();
  
  // Always use local format for "today"
  const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 font-bold">Loading...</div>;
  }

  const todayLog = getLogByDate(todayStr);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 sm:p-8 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <header className="h-20 bg-white border border-slate-200 px-6 sm:px-8 rounded-3xl flex items-center justify-between shrink-0 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-xl relative">
                 <div className="w-4 h-4 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-emerald-600 hidden sm:inline mr-2">HealthTrack</span>
              স্বাগতম! (Welcome!) 👋
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             {Object.keys(logs).length === 0 && (
                <button 
                  onClick={generateMockData}
                  className="text-xs px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors font-bold shadow-sm"
                >
                  Load Demo
                </button>
             )}
             <div className="text-right hidden sm:block">
               <p className="text-xs text-slate-400 font-medium">{format(new Date(), 'MMMM d, yyyy')}</p>
               <p className="text-sm font-bold text-slate-700">{format(new Date(), 'EEEE')}</p>
             </div>
          </div>
        </header>

        <SummaryCards todayLog={todayLog} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <DailyForm todayLog={todayLog} onSave={saveLog} />
          </div>
          <div className="lg:col-span-7">
            <TrendsChart logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
