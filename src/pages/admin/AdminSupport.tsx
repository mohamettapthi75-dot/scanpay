import React, { useState } from 'react';
import { 
  Ticket, MessageSquare, CheckCircle, Clock, 
  Search, AlertCircle
} from 'lucide-react';

const TICKETS = [
  { id: 'TKT-1082', user: '7538881', issue: 'OTP not received via SMS', priority: 'HIGH', status: 'OPEN', time: '10m ago' },
  { id: 'TKT-1081', user: '7721199', issue: 'Wrong merchant paid', priority: 'MEDIUM', status: 'IN_PROGRESS', time: '1h ago' },
  { id: 'TKT-1080', user: 'M25010', issue: 'QR Code not scanning', priority: 'CRITICAL', status: 'OPEN', time: '2h ago' },
  { id: 'TKT-1079', user: '7112233', issue: 'App crashing on payment', priority: 'MEDIUM', status: 'RESOLVED', time: '1d ago' },
];

export default function AdminSupport() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2 flex items-center gap-3">
            <Ticket className="w-8 h-8 text-[#EC4899]" />
            Support Hub
          </h1>
          <p className="text-[#94A3B8] font-semibold">Manage customer queries and merchant technical issues.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#00F5FF]/50 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl relative overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-white/5">
                <th className="p-4 pl-6">Ticket ID</th>
                <th className="p-4">Customer/Merchant</th>
                <th className="p-4">Issue Description</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Status & Time</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/[0.02]">
              {TICKETS.map((tkt) => (
                <tr key={tkt.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 pl-6 font-mono text-white font-bold text-xs">{tkt.id}</td>
                  <td className="p-4 font-mono text-[#94A3B8] tracking-wider text-xs">{tkt.user}</td>
                  <td className="p-4 text-white font-semibold max-w-[200px] truncate">{tkt.issue}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider font-black ${
                      tkt.priority === 'CRITICAL' ? 'bg-[#FF4D4D] text-white' :
                      tkt.priority === 'HIGH' ? 'bg-[#FFB020]/20 text-[#FFB020]' :
                      'bg-white/10 text-[#94A3B8]'
                    }`}>
                      {tkt.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-black ${
                        tkt.status === 'OPEN' ? 'bg-[#FFB020]/10 text-[#FFB020]' :
                        tkt.status === 'IN_PROGRESS' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' :
                        'bg-[#00C896]/10 text-[#00C896]'
                      }`}>
                        {tkt.status}
                      </span>
                      <div className="text-[10px] font-mono text-[#94A3B8]">
                        <Clock className="inline w-3 h-3 mr-1" /> {tkt.time}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 pr-6">
                     <div className="flex justify-end gap-2">
                       <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#3B82F6]/20 text-xs font-bold uppercase tracking-wider text-white hover:text-[#3B82F6] transition-colors flex items-center gap-1">
                         <MessageSquare className="w-3.5 h-3.5" /> Reply
                       </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
