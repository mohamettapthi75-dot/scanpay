import React from 'react';
import { 
  ShieldAlert, UserX, AlertTriangle, Fingerprint, 
  Crosshair, ShieldCheck, Activity 
} from 'lucide-react';

const fraudAlerts = [
  { id: 'FA-901', type: 'FAKE_QR_ATTEMPT', user: 'Unknown', target: 'M25010', ip: '102.xxx.xx.44', time: '10 mins ago', risk: 'HIGH', status: 'Blocked' },
  { id: 'FA-902', type: 'DUPLICATE_TXN_BURST', user: 'U10033', target: 'U10055', ip: '41.xxx.xx.12', time: '45 mins ago', risk: 'CRITICAL', status: 'Account Frozen' },
  { id: 'FA-903', type: 'INVALID_CARRIER_NUM', user: 'U10199', target: 'N/A', ip: '197.xxx.xx.8', time: '2 hours ago', risk: 'LOW', status: 'Logged' },
];

const failedPayments = [
  { id: 'FP-401', user: '7538881', issue: 'USSD_TIMEOUT', detail: 'Network unresponsive after *883*', time: '14:18', status: 'Pending Retry' },
  { id: 'FP-402', user: '7721199', issue: 'WRONG_PIN_MAX', detail: '3 failed PIN attempts at gateway', time: '13:05', status: 'Session Locked' },
];

export default function AdminFraud() {
  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[#FF4D4D]" />
            Security & Compliance
          </h1>
          <p className="text-[#94A3B8] font-semibold">Automated threat detection and failed payment center.</p>
        </div>
        
        <div className="bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 px-4 py-3 rounded-xl flex items-center gap-3 backdrop-blur-md">
          <div className="w-12 h-12 rounded-lg bg-[#FF4D4D]/20 flex items-center justify-center">
            <Crosshair className="w-6 h-6 text-[#FF4D4D]" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF4D4D] mb-0.5">Threat Level</p>
            <p className="text-lg font-black text-white leading-none">ELEVATED</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Fraud Detection Center */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4D4D]/5 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8] mb-6 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-[#FF4D4D]" /> Active Threat Alerts
          </h3>
          
          <div className="space-y-4 flex-1">
            {fraudAlerts.map(alert => (
              <div key={alert.id} className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-[#FF4D4D]/30 transition-colors group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#FFB020]" />
                    <span className="text-xs font-black text-white tracking-wider">{alert.type.replace(/_/g, ' ')}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-[9px] uppercase tracking-wider font-black ${
                    alert.risk === 'CRITICAL' ? 'bg-[#FF4D4D] text-white' : 
                    alert.risk === 'HIGH' ? 'bg-[#FFB020]/20 text-[#FFB020] border border-[#FFB020]/50' :
                    'bg-white/10 text-[#94A3B8]'
                  }`}>
                    {alert.risk}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#94A3B8] mb-4">
                  <div>User: <span className="text-white">{alert.user}</span></div>
                  <div>IP: <span className="text-white">{alert.ip}</span></div>
                  <div>Target: <span className="text-white">{alert.target}</span></div>
                  <div>Time: <span className="text-white">{alert.time}</span></div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                  <span className="text-[10px] font-bold text-[#00C896] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {alert.status}
                  </span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold uppercase tracking-wider text-white transition-colors">
                      Investigate
                    </button>
                    <button className="px-3 py-1 bg-[#FF4D4D]/10 hover:bg-[#FF4D4D]/20 rounded text-[10px] font-bold uppercase tracking-wider text-[#FF4D4D] transition-colors border border-[#FF4D4D]/20">
                      Ban IP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Failed Payments Center */}
        <div className="bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFB020]/5 blur-3xl rounded-full pointer-events-none" />
          
          <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8] mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#FFB020]" /> Payment Resolution Handlers
          </h3>

          <div className="space-y-4 flex-1">
            {failedPayments.map(fail => (
              <div key={fail.id} className="bg-[#FFB020]/5 border border-[#FFB020]/20 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-black text-white">{fail.issue.replace(/_/g, ' ')}</h4>
                  <span className="text-[10px] font-mono text-[#94A3B8]">{fail.time}</span>
                </div>
                
                <p className="text-xs text-[#FFB020] mb-3">{fail.detail}</p>
                
                <div className="flex items-center gap-3 text-xs font-mono text-white mb-4">
                  <UserX className="w-4 h-4 text-[#94A3B8]" /> {fail.user}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#FFB020]/10">
                  <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    {fail.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-md text-[10px] font-bold uppercase tracking-wider text-white transition-colors">
                      Contact User
                    </button>
                    <button className="px-3 py-1.5 bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 rounded-md text-[10px] font-bold uppercase tracking-wider text-[#00F5FF] transition-colors border border-[#00F5FF]/20">
                      Reset Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
