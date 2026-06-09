import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, Users, Smartphone } from 'lucide-react';

const TXN_HISTORY = [
  { day: '01', val: 120 }, { day: '02', val: 180 }, { day: '03', val: 150 },
  { day: '04', val: 240 }, { day: '05', val: 320 }, { day: '06', val: 280 },
  { day: '07', val: 410 }, { day: '08', val: 390 }, { day: '09', val: 560 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#8B5CF6]" />
            Deep Analytics
          </h1>
          <p className="text-[#94A3B8] font-semibold">Growth metrics and historical transaction data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Txn Growth */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 mb-6">
            <TrendingUp className="w-4 h-4 text-[#00F5FF]" /> Transaction Volume Growth
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TXN_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#060816', borderColor: '#ffffff1a', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="val" stroke="#00F5FF" strokeWidth={4} dot={false} activeDot={{ r: 6, fill: '#00F5FF' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 mb-6">
            <Users className="w-4 h-4 text-[#3B82F6]" /> User Base Expansion
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TXN_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                   cursor={{ fill: '#ffffff05' }}
                   contentStyle={{ backgroundColor: '#060816', borderColor: '#ffffff1a', borderRadius: '12px' }}
                />
                <Bar dataKey="val" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
