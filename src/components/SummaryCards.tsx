import { DailyLog } from '../types';
import { Card } from './Card';
import { Droplet, Footprints, Moon, Scale } from 'lucide-react';

interface SummaryCardsProps {
  todayLog: DailyLog;
}

export function SummaryCards({ todayLog }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-cyan-50 text-cyan-500 rounded-xl flex items-center justify-center">
            <Droplet size={20} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-400 font-medium tracking-wide">Water</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayLog.water}</p>
            <p className="text-sm font-medium text-slate-400">glasses</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
             <div key={i} className={`flex-1 h-2 rounded-full ${i < todayLog.water / 2 ? 'bg-cyan-500' : 'bg-slate-100'}`}></div>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
             <Footprints size={20} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-400 font-medium tracking-wide">Steps</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayLog.steps.toLocaleString()}</p>
          </div>
        </div>
         <div className="mt-4 flex gap-1">
          <div className="flex-1 h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(todayLog.steps / 10000 * 100, 100)}%` }}></div>
        </div>
      </Card>

      <Card className="flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
             <Moon size={20} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-400 font-medium tracking-wide">Sleep</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayLog.sleep}</p>
            <p className="text-sm font-medium text-slate-400">hours</p>
          </div>
        </div>
         <div className="mt-4 h-2 bg-slate-100 rounded-xl relative overflow-hidden">
             <div className="absolute left-0 top-0 h-full bg-blue-500 rounded-r-xl" style={{ width: `${Math.min(todayLog.sleep / 8 * 100, 100)}%` }}></div>
          </div>
      </Card>

      <Card className="flex flex-col justify-between bg-emerald-600 text-white border-transparent">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-white/20 text-white rounded-xl flex items-center justify-center">
             <Scale size={20} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-white/70 font-medium tracking-wide">Weight</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{todayLog.weight || '--'}</p>
            <p className="text-sm font-medium text-white/70">kg</p>
          </div>
        </div>
        <p className="text-[10px] mt-4 uppercase font-bold tracking-widest text-emerald-200">Latest Record</p>
      </Card>
    </div>
  );
}
