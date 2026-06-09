import React from 'react';
import { 
  Users, Store, Activity, AlertTriangle, 
  ShieldAlert, QrCode, Smartphone, DollarSign,
  ArrowUpRight, ArrowDownRight, TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const REVENUE_DATA = [
  { time: '00:00', amount: 1200 },
  { time: '04:00', amount: 800 },
  { time: '08:00', amount: 4500 },
  { time: '12:00', amount: 8900 },
  { time: '16:00', amount: 12500 },
  { time: '20:00', amount: 9200 },
  { time: '23:59', amount: 3100 },
];

const SCAN_DATA = [
  { day: 'Mon', scans: 45000, failed: 1200 },
  { day: 'Tue', scans: 52000, failed: 900 },
  { day: 'Wed', scans: 48000, failed: 1500 },
  { day: 'Thu', scans: 61000, failed: 800 },
  { day: 'Fri', scans: 75000, failed: 2100 },
  { day: 'Sat', scans: 82000, failed: 3500 },
  { day: 'Sun', scans: 69000, failed: 1100 },
];

const STATS = [
  { label: "Total Users", value: "842,591", icon: Users, color: "#3B82F6", trend: "+12.5%", isUp: true },
  { label: "Total Merchants", value: "45,210", icon: Store, color: "#00F5FF", trend: "+8.2%", isUp: true },
  { label: "Today Transactions", value: "1.2M", icon: Activity, color: "#00C896", trend: "+24.1%", isUp: true },
  { label: "Failed Transactions", value: "4,215", icon: AlertTriangle, color: "#FF4D4D", trend: "-5.4%", isUp: false },
  { label: "Suspicious Activities", value: "128", icon: ShieldAlert, color: "#FFB020", trend: "+1.2%", isUp: true },
  { label: "QR Scans Today", value: "3.4M", icon: QrCode, color: "#8B5CF6", trend: "+18.9%", isUp: true },
  { label: "Active Devices", value: "821K", icon: Smartphone, color: "#EC4899", trend: "+11.4%", isUp: true },
  { label: "Revenue Processed", value: "$45.2M", icon: DollarSign, color: "#10B981", trend: "+32.5%", isUp: true },
];

const RECENT_TRANSACTIONS = [
  { id: "TXN-8921A", from: "7538881", to: "M201", type: "MERCHANT_PAY", amount: "$45.00", status: "COMPLETED", time: "2m ago" },
  { id: "TXN-8921B", from: "7721199", to: "U105", type: "P2P_TRANSFER", amount: "$12.50", status: "COMPLETED", time: "5m ago" },
  { id: "TXN-8921C", from: "7554433", to: "M942", type: "MERCHANT_PAY", amount: "$120.00", status: "FAILED", time: "8m ago" },
  { id: "TXN-8921D", from: "7998877", to: "M110", type: "MERCHANT_PAY", amount: "$8.00", status: "PENDING", time: "12m ago" },
];

// Helper styles
const cardBase = "bg-[rgba(255,255,255,0.02)] border border-[#ffffff0a] backdrop-blur-xl rounded-2xl relative overflow-hidden";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wider text-white mb-2">Command Center</h1>
          <p className="text-[#94A3B8] font-semibold">Real-time Golis Sahal USSD network overview.</p>
        </div>
        <div className="flex items-center gap-3 bg-[#00C896]/10 border border-[#00C896]/20 px-4 py-2 rounded-xl text-[#00C896] font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(0,200,150,0.1)]">
          <div className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
          SYSTEM OPTIMAL
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`${cardBase} p-5 group hover:border-[${stat.color}]/30 transition-colors duration-500`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-[${stat.color}]/10 blur-2xl rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl bg-[${stat.color}]/10 flex items-center justify-center border border-[${stat.color}]/20`}>
                <stat.icon className="w-5 h-5" color={stat.color} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-[${stat.color}]/10 text-[${stat.color}]`}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            
            <h3 className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h3>
            <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className={`${cardBase} p-6 lg:col-span-2 shadow-xl`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00F5FF]" /> Volume Processed (Today)
            </h3>
            <select className="bg-transparent border border-white/10 rounded-lg text-sm text-white px-3 py-1 outline-none focus:border-[#00F5FF]">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#060816', borderColor: '#ffffff1a', borderRadius: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#00F5FF' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#00F5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Failed QA/Scans */}
        <div className={`${cardBase} p-6 shadow-xl flex flex-col`}>
          <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8] flex items-center gap-2 mb-6">
            <QrCode className="w-4 h-4 text-[#8B5CF6]" /> Weekly Scan Activity
          </h3>
          
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCAN_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#060816', borderColor: '#ffffff1a', borderRadius: '12px' }}
                />
                <Bar dataKey="scans" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="failed" fill="#FF4D4D" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              <div className="w-3 h-3 rounded-sm bg-[#8B5CF6]" /> Valid Scans
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
              <div className="w-3 h-3 rounded-sm bg-[#FF4D4D]" /> Failed
            </div>
          </div>
        </div>

      </div>

      {/* Live Transaction Feed */}
      <div className={`${cardBase} shadow-xl`}>
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#94A3B8]">Live USSD Streams</h3>
          <button className="text-[#00F5FF] text-xs font-bold uppercase tracking-wider hover:underline">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-xs font-bold uppercase tracking-widest text-[#94A3B8]">
                <th className="p-4 pl-6 font-medium">Txn ID</th>
                <th className="p-4 font-medium">From (Golis)</th>
                <th className="p-4 font-medium">To (Node)</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 pr-6 font-medium text-right">Time</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-white/[0.02]">
              {RECENT_TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="p-4 pl-6 text-white font-mono">{txn.id}</td>
                  <td className="p-4 text-[#94A3B8] font-mono tracking-wider">{txn.from}</td>
                  <td className="p-4 text-white font-mono tracking-wider">{txn.to}</td>
                  <td className="p-4">
                    <span className="bg-white/5 px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold text-[#94A3B8]">
                      {txn.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{txn.amount}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-black flex items-center gap-1.5 w-fit ${
                      txn.status === 'COMPLETED' ? 'bg-[#00C896]/10 text-[#00C896] border border-[#00C896]/20' :
                      txn.status === 'FAILED' ? 'bg-[#FF4D4D]/10 text-[#FF4D4D] border border-[#FF4D4D]/20' :
                      'bg-[#FFB020]/10 text-[#FFB020] border border-[#FFB020]/20'
                    }`}>
                      {txn.status === 'COMPLETED' && <div className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />}
                      {txn.status === 'FAILED' && <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D4D]" />}
                      {txn.status === 'PENDING' && <div className="w-1.5 h-1.5 rounded-full bg-[#FFB020] animate-pulse" />}
                      {txn.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right text-[#94A3B8]">{txn.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
