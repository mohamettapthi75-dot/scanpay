import React from 'react';
import { 
  Server, Activity, CheckCircle2, AlertTriangle, 
  Wifi, Zap, Shield, Box
} from 'lucide-react';

const SYSTEM_STATUS = [
  { name: 'Core API Gateway', status: 'Online', ms: 14, icon: Server, color: '#00C896' },
  { name: 'Golis USSD Bridge', status: 'Online', ms: 42, icon: Wifi, color: '#00C896' },
  { name: 'QR Engine', status: 'Online', ms: 8, icon: Box, color: '#00C896' },
  { name: 'Fraud Detection AI', status: 'Online', ms: 125, icon: Shield, color: '#00C896' },
  { name: 'SMS Gateway', status: 'Slow', ms: 850, icon: Zap, color: '#FFB020' },
  { name: 'Analytics Sync', status: 'Offline', ms: 0, icon: Activity, color: '#FF4D4D' },
];

export default function AdminSystem() {
  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2 flex items-center gap-3">
            <Activity className="w-8 h-8 text-[#3B82F6]" />
            System Monitor
          </h1>
          <p className="text-[#94A3B8] font-semibold">Infrastructure health and Golis integration status.</p>
        </div>
        
        <div className="bg-[rgba(255,255,255,0.02)] border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-[#94A3B8]">
          Uptime: <span className="text-[#00C896] font-black">99.998%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SYSTEM_STATUS.map((sys) => (
          <div key={sys.name} className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl p-6 relative overflow-hidden group">
            <div className={`absolute -right-10 -top-10 w-32 h-32 blur-3xl rounded-full opacity-20 pointer-events-none`} style={{ backgroundColor: sys.color }} />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10`}>
                <sys.icon className="w-6 h-6" style={{ color: sys.color }} />
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-black border ${
                sys.status === 'Online' ? 'bg-[#00C896]/10 text-[#00C896] border-[#00C896]/20' :
                sys.status === 'Offline' ? 'bg-[#FF4D4D]/10 text-[#FF4D4D] border-[#FF4D4D]/20' :
                'bg-[#FFB020]/10 text-[#FFB020] border-[#FFB020]/20'
              }`}>
                {sys.status}
              </span>
            </div>
            
            <h3 className="text-sm font-black text-white tracking-wide relative z-10">{sys.name}</h3>
            
            <div className="flex justify-between items-end mt-4 relative z-10">
              <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
                Latency
              </div>
              <div className="font-mono text-xl font-black text-white tracking-tight">
                {sys.ms} <span className="text-[10px] text-[#94A3B8]">ms</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Console output mock */}
      <div className="bg-[#060816] border border-white/10 rounded-2xl p-6 font-mono text-[11px] shadow-inner mt-8">
        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-[#94A3B8] ml-4">Terminal / Logs</span>
        </div>
        <div className="space-y-1.5 text-[#00F5FF]/80">
          <p>[14:22:15] <span className="text-white">INFO:</span> USSD payload generated for session 8921A</p>
          <p>[14:22:16] <span className="text-[#00C896]">SUCCESS:</span> Golis callback received HTTP 200</p>
          <p>[14:25:01] <span className="text-white">INFO:</span> Scheduled health check running...</p>
          <p>[14:25:02] <span className="text-[#FFB020]">WARN:</span> SMS Gateway latency spike detected (850ms)</p>
          <p className="animate-pulse">_</p>
        </div>
      </div>
    </div>
  );
}
