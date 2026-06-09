import React, { useState } from 'react';
import { 
  Search, Filter, QrCode, ShieldCheck, 
  Store, AlertTriangle, ChevronRight, Activity, Ban 
} from 'lucide-react';

const mockMerchants = [
  { id: 'M25010', name: 'Hargeisa Cafe', phone: '+252 63 1234567', sales: '$542.40', txns: 124, score: 99, status: 'Verified' },
  { id: 'M25011', name: 'Al-Madina Supermarket', phone: '+252 90 771 8899', sales: '$1,204.50', txns: 310, score: 98, status: 'Verified' },
  { id: 'M25012', name: 'Modern Pharmacy', phone: '+252 90 755 2211', sales: '$340.00', txns: 42, score: 85, status: 'Pending Review' },
  { id: 'M25013', name: 'Tech Solutions Ltd', phone: '+252 90 744 5566', sales: '$950.00', txns: 15, score: 60, status: 'Flagged' },
];

export default function AdminMerchants() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2">Merchant Nexus</h1>
          <p className="text-[#94A3B8] font-semibold">Monitor business nodes, QR generation, and daily volume.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search business name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#00F5FF]/50 focus:outline-none transition-all w-64"
            />
          </div>
          <button className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl px-4 py-2.5 hover:bg-white/5 transition-colors text-[#00F5FF] font-bold text-sm tracking-wide uppercase">
            + New Merchant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Active Merchants", value: "45,210", color: "text-[#00F5FF]" },
          { label: "Pending Verification", value: "142", color: "text-[#FFB020]" },
          { label: "Frozen Accounts", value: "28", color: "text-[#FF4D4D]" },
          { label: "Avg Risk Score", value: "96.4", color: "text-[#00C896]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[rgba(255,255,255,0.02)] border border-white/5 p-5 rounded-2xl relative overflow-hidden">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">{stat.label}</h4>
            <div className={`text-2xl font-black ${stat.color} font-mono tracking-tight`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockMerchants.map((merchant) => (
          <div key={merchant.id} className="bg-[rgba(255,255,255,0.02)] border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/10 transition-colors shadow-lg">
            
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-14 h-14 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 flex items-center justify-center shrink-0">
                <Store className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-lg text-white tracking-wide">{merchant.name}</h3>
                  {merchant.status === 'Verified' && <ShieldCheck className="w-4 h-4 text-[#00C896]" />}
                  {merchant.status === 'Flagged' && <AlertTriangle className="w-4 h-4 text-[#FF4D4D]" />}
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-[#94A3B8]">
                  <span className="text-[#00F5FF]">{merchant.id}</span>
                  <span>{merchant.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">Daily Sales</p>
                <p className="font-mono font-bold text-[#00C896] text-lg leading-none">{merchant.sales}</p>
                <p className="text-[10px] font-bold text-white/50 mt-1">{merchant.txns} txns</p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">Risk</p>
                <div className="w-12 h-12 rounded-full border-4 border-[#00C896]/20 flex items-center justify-center font-mono font-bold text-sm text-white">
                  {merchant.score}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl bg-white/5 hover:bg-[#00F5FF]/20 text-white hover:text-[#00F5FF] transition-colors" title="Generate QR">
                  <QrCode className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 hover:bg-[#FF4D4D]/20 text-white hover:text-[#FF4D4D] transition-colors" title="Freeze Account">
                  <Ban className="w-4 h-4" />
                </button>
                <button className="p-2.5 rounded-xl bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 text-[#00F5FF] transition-colors flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider hidden sm:block">Logs</span>
                </button>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
