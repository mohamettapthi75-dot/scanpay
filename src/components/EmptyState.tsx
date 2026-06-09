import React from 'react';
import { Ghost } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0c0e1a]/85 backdrop-blur-[20px] rounded-[2rem] border border-blue-500/20 border-dashed shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-blue-500/5 to-transparent pointer-events-none" />
      <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sky-400 mb-4 shadow-md relative z-10 animate-pulse">
        {icon || <Ghost className="w-7 h-7 stroke-[2.2]" />}
      </div>
      <h3 className="text-white font-black text-sm mb-2 uppercase tracking-wider relative z-10">{title}</h3>
      <p className="text-xs text-slate-400 max-w-xs leading-relaxed relative z-10">{description}</p>
    </div>
  );
}
