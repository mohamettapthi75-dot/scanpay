import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, ShieldCheck, 
  Ban, RotateCcw, AlertTriangle, Eye, Activity
} from 'lucide-react';

const mockUsers = [
  { id: 'U10029', name: 'Ahmed Hassan', phone: '+252 90 753 8881', device: 'iPhone 14 Pro', status: 'Active', qrs: 'Valid', login: '2026-05-27 14:22' },
  { id: 'U10030', name: 'Sahra Mohamed', phone: '+252 90 771 2291', device: 'Samsung S23', status: 'Active', qrs: 'Valid', login: '2026-05-27 12:45' },
  { id: 'U10031', name: 'Abdi Yusuf', phone: '+252 90 777 4433', device: 'Unknown', status: 'Suspended', qrs: 'Disabled', login: '2026-05-26 09:11' },
  { id: 'U10032', name: 'Muna Ali', phone: '+252 90 751 1122', device: 'iPhone 13', status: 'Active', qrs: 'Valid', login: '2026-05-27 16:30' },
  { id: 'U10033', name: 'Farah Abdi', phone: '+252 90 711 5566', device: 'Pixel 7', status: 'Flagged', qrs: 'Warning', login: '2026-05-27 17:05' },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2">User Index</h1>
          <p className="text-[#94A3B8] font-semibold">Manage all customer nodes and access rights.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input 
              type="text" 
              placeholder="Search by ID or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-[#00F5FF]/50 focus:outline-none transition-all w-64"
            />
          </div>
          <button className="bg-[rgba(255,255,255,0.02)] border border-white/10 rounded-xl p-2.5 hover:bg-white/5 transition-colors text-[#94A3B8] hover:text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl relative overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] border-b border-white/5">
                <th className="p-5">User ID</th>
                <th className="p-5">Customer Profile</th>
                <th className="p-5">Golis Number</th>
                <th className="p-5">Device</th>
                <th className="p-5">QR State</th>
                <th className="p-5">Account Status</th>
                <th className="p-5">Last Login</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/[0.02]">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-mono text-[#00F5FF] font-bold text-xs">{user.id}</td>
                  <td className="p-5 font-bold text-white tracking-wide">{user.name}</td>
                  <td className="p-5 font-mono text-[#94A3B8] tracking-widest text-xs">{user.phone}</td>
                  <td className="p-5 text-[#94A3B8]">{user.device}</td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-black ${
                      user.qrs === 'Valid' ? 'bg-[#00C896]/10 text-[#00C896]' :
                      user.qrs === 'Disabled' ? 'bg-[#FF4D4D]/10 text-[#FF4D4D]' :
                      'bg-[#FFB020]/10 text-[#FFB020]'
                    }`}>
                      {user.qrs}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-black border ${
                      user.status === 'Active' ? 'bg-[#00C896]/5 text-[#00C896] border-[#00C896]/20' :
                      user.status === 'Suspended' ? 'bg-[#FF4D4D]/5 text-[#FF4D4D] border-[#FF4D4D]/20' :
                      'bg-[#FFB020]/5 text-[#FFB020] border-[#FFB020]/20'
                    }`}>
                      {user.status === 'Active' && <ShieldCheck className="w-3 h-3" />}
                      {user.status === 'Suspended' && <Ban className="w-3 h-3" />}
                      {user.status === 'Flagged' && <AlertTriangle className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="p-5 text-[#94A3B8] text-xs font-mono">{user.login}</td>
                  <td className="p-5">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors" title="View Logs">
                        <Activity className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-[#3B82F6]/20 text-[#3B82F6] transition-colors" title="Reset PIN">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FF4D4D]/20 text-[#FF4D4D] transition-colors" title="Suspend">
                        <Ban className="w-4 h-4" />
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
