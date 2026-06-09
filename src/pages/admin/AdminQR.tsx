import React, { useState } from 'react';
import { 
  QrCode, Search, RefreshCw, Slash, Eye, 
  Copy, ShieldCheck, FileText, CheckCircle2
} from 'lucide-react';

const mockQRs = [
  { id: 'QR-9901', payload: 'SPAY:U101:7538881:Ahmed:CUSTOMER:HASHa1b2', type: 'CUSTOMER', owner: '7538881', created: '2026-05-20', status: 'ACTIVE' },
  { id: 'QR-9902', payload: 'SPAY:M201:7538811:AliShop:MERCHANT:HASHc3d4', type: 'MERCHANT', owner: 'M25010', created: '2026-05-22', status: 'ACTIVE' },
  { id: 'QR-9903', payload: 'SPAY:M402:7721199:TechStore:MERCHANT:HASHe5f6', type: 'MERCHANT', owner: 'M25013', created: '2026-05-25', status: 'DISABLED' },
  { id: 'QR-9904', payload: 'SPAY:U105:7442323:Farah:CUSTOMER:HASHg7h8', type: 'CUSTOMER', owner: '7442323', created: '2026-05-27', status: 'ACTIVE' },
];

export default function AdminQR() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2 flex items-center gap-3">
            <QrCode className="w-8 h-8 text-[#00F5FF]" />
            QR Payload Registry
          </h1>
          <p className="text-[#94A3B8] font-semibold">Ensure uniqueness and validity for all generated ScanPay tags.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input 
            type="text" 
            placeholder="Search payload hash..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#00F5FF]/50 focus:outline-none transition-all w-64 md:w-80"
          />
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl relative overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-white/5">
                <th className="p-4 pl-6">Identifier (ID/Owner)</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4 bg-[#00F5FF]/5 text-[#00F5FF]">Raw Payload String</th>
                <th className="p-4">Status & Integrity</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 pr-6 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/[0.02]">
              {mockQRs.map((qr) => (
                <tr key={qr.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="font-mono text-white font-bold text-xs">{qr.id}</div>
                    <div className="text-[10px] text-[#94A3B8] font-mono mt-1">Owner: {qr.owner}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider font-black ${
                      qr.type === 'MERCHANT' ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20' :
                      'bg-white/10 text-white border border-white/20'
                    }`}>
                      {qr.type}
                    </span>
                  </td>
                  <td className="p-4 bg-[#00F5FF]/5">
                    <div className="flex items-center gap-3">
                      <div className="font-mono font-black text-[#00F5FF] tracking-widest text-[10px] truncate max-w-sm">
                        {qr.payload}
                      </div>
                      <button className="text-[#00F5FF]/50 hover:text-[#00F5FF] transition-colors" title="Copy Payload">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-black ${
                        qr.status === 'ACTIVE' ? 'bg-[#00C896]/10 text-[#00C896]' :
                        'bg-[#FF4D4D]/10 text-[#FF4D4D]'
                      }`}>
                        {qr.status}
                      </span>
                      {qr.status === 'ACTIVE' && (
                         <div className="text-[9px] font-bold text-[#00C896]/70 flex items-center gap-1 uppercase tracking-wider">
                           <CheckCircle2 className="w-3 h-3" /> Hash Verified
                         </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-[11px] font-mono text-[#94A3B8]">{qr.created}</td>
                  <td className="p-4 pr-6">
                    <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-[#3B82F6]/20 text-[#3B82F6] transition-colors" title="Scan History">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-[#00F5FF]/20 text-[#00F5FF] transition-colors" title="Regenerate QR">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FF4D4D]/20 text-[#FF4D4D] transition-colors" title="Disable QR">
                        <Slash className="w-4 h-4" />
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
