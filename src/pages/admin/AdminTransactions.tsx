import React, { useState } from 'react';
import { Search, Filter, Download, TerminalSquare, AlertCircle } from 'lucide-react';

const mockTxns = [
  { id: 'TXN-A981', type: 'PAYMENT', sender: '7538881', receiver: '7412233', amount: '150.00', generatedUssd: '*883*7412233*150#', time: '14:22:15', status: 'COMPLETED', ip: '197.xxx.xxx.12' },
  { id: 'TXN-A982', type: 'PAYMENT', sender: '7721199', receiver: '7556677', amount: '25.50', generatedUssd: '*883*7556677*25.5#', time: '14:21:05', status: 'COMPLETED', ip: '197.xxx.xxx.45' },
  { id: 'TXN-A983', type: 'MERCHANT', sender: '7998877', receiver: '7538881', amount: '800.00', generatedUssd: '*883*7538881*800#', time: '14:18:42', status: 'FAILED', ip: '102.xxx.xxx.88', error: 'USSD_TIMEOUT' },
  { id: 'TXN-A984', type: 'PAYMENT', sender: '7115566', receiver: '7442323', amount: '12.00', generatedUssd: '*883*7442323*12#', time: '14:15:11', status: 'BLOCKED', ip: '41.xxx.xxx.22', error: 'FRAUD_FLAG' },
  { id: 'TXN-A985', type: 'PAYMENT', sender: '7554433', receiver: '7221199', amount: '45.00', generatedUssd: '*883*7221199*45#', time: '14:10:00', status: 'PENDING', ip: '197.xxx.xxx.15' },
];

export default function AdminTransactions() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2">Transaction Ledger</h1>
          <p className="text-[#94A3B8] font-semibold">Immutable logs of generated USSD commands and network responses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search TXN ID or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#00F5FF]/50 focus:outline-none transition-all w-64"
            />
          </div>
          <button className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl p-2.5 hover:bg-white/5 transition-colors text-[#94A3B8] hover:text-white">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-[#00F5FF]/10 border border-[#00F5FF]/20 rounded-xl p-2.5 hover:bg-[#00F5FF]/20 transition-colors text-[#00F5FF]">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl relative overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-white/5">
                <th className="p-4 pl-6">ID / Time</th>
                <th className="p-4">Sender</th>
                <th className="p-4">Receiver</th>
                <th className="p-4">Amount</th>
                <th className="p-4 bg-[#00F5FF]/5 text-[#00F5FF]">Generated USSD</th>
                <th className="p-4">Status & IP</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/[0.02]">
              {mockTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="font-mono text-white font-bold text-xs">{txn.id}</div>
                    <div className="text-[10px] text-[#94A3B8] mt-1">{txn.time}</div>
                  </td>
                  <td className="p-4 font-mono text-[#94A3B8] tracking-wider text-xs">{txn.sender}</td>
                  <td className="p-4 font-mono text-white tracking-wider text-xs">{txn.receiver}</td>
                  <td className="p-4 font-mono font-bold text-[#00C896]">${txn.amount}</td>
                  
                  {/* CRITICAL: display exactly what we generate for Sahal */}
                  <td className="p-4 bg-[#00F5FF]/5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#060816] border border-[#00F5FF]/20 shadow-inner">
                      <TerminalSquare className="w-4 h-4 text-[#00F5FF]" />
                      <span className="font-mono font-black text-[#00F5FF] tracking-widest text-xs">{txn.generatedUssd}</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-black ${
                        txn.status === 'COMPLETED' ? 'bg-[#00C896]/10 text-[#00C896]' :
                        txn.status === 'FAILED' ? 'bg-[#FF4D4D]/10 text-[#FF4D4D]' :
                        txn.status === 'BLOCKED' ? 'bg-red-900/40 text-red-400 border border-red-500/30' :
                        'bg-[#FFB020]/10 text-[#FFB020]'
                      }`}>
                        {txn.status}
                      </span>
                      <div className="text-[10px] font-mono text-[#94A3B8]/60 flex items-center gap-1">
                        {txn.error && <AlertCircle className="w-3 h-3 text-[#FF4D4D]" />}
                        {txn.ip}
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 pr-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors">
                        Details
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
