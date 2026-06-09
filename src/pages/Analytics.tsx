import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { ArrowLeft, TrendingUp, Users, CreditCard, ChevronDown, Clock, Activity as ActivityIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function Analytics() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("THIS WEEK");

  const CUSTOMERS = [
    { initials: "SM", name: "Sahra Mohamed", rank: "1st", purchases: "28 purchases", amount: "$384.50", color: "text-[#10B981] bg-emerald-500/10 border-emerald-500/15" },
    { initials: "AA", name: "Abdirahman Ali", rank: "2nd", purchases: "21 purchases", amount: "$241.00", color: "text-[#10B981] bg-emerald-500/10 border-emerald-500/15" },
    { initials: "AH", name: "Ahmed Hassan", rank: "3rd", purchases: "19 purchases", amount: "$182.50", color: "text-[#10B981] bg-emerald-500/10 border-emerald-500/15" },
    { initials: "MA", name: "Muna Aden", rank: "4th", purchases: "12 purchases", amount: "$154.00", color: "text-[#10B981] bg-emerald-500/10 border-emerald-500/15" },
    { initials: "FB", name: "Fartun Farah", rank: "5th", purchases: "9 purchases", amount: "$98.20", color: "text-[#10B981] bg-emerald-500/10 border-emerald-500/15" },
  ];

  return (
    <AppLayout className="relative overflow-hidden bg-[#F8F9FC] text-[#0F172A]">

      <div className="flex-1 overflow-y-auto pb-32 md:pb-8 relative z-10 no-scrollbar w-full font-sans">
        <div className="px-5 pt-[calc(20px+env(safe-area-inset-top))] pb-6 max-w-xl mx-auto w-full">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 active:scale-95 transition-colors cursor-pointer"
            >
               <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xs font-black tracking-[0.2em] uppercase text-[#94A3B8] font-display ml-6">Analytics</h1>
            <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#10B981] transition-all cursor-pointer hover:opacity-80">
              {timeframe} <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Main Card */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 pb-8 rounded-[32px] bg-[#1E293B] shadow-lg overflow-hidden relative shadow-[#1E293B]/20"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#94A3B8] flex items-center gap-2 mb-1.5">
                 <ActivityIcon className="w-4 h-4 text-[#10B981]" /> TOTAL REVENUE
              </p>
              
              <h2 className="text-[42px] font-black text-white font-mono tracking-tight mt-1 leading-none">
                $12,450.00
              </h2>
              
              <div className="flex items-center gap-1.5 mt-5 text-[10px] font-bold uppercase tracking-wider text-[#10B981] border border-[#10B981]/30 w-fit px-3py-1.5 py-1.5 rounded-full shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" /> +14.5% VS LAST WEEK
              </div>
            </motion.div>

            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#94A3B8] ml-1 mt-2">
              PERFORMANCE METRICS
            </h3>
            
            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: CreditCard, label: "VOLUME", value: "1,248", diff: "+8% GROWTH", up: true },
                { icon: Users, label: "CUSTOMERS", value: "452", diff: "+12% MONTHLY", up: true },
                { icon: TrendingUp, label: "AVG ORDER", value: "$24.50", diff: "-2.4% AVG", up: false },
                { icon: Clock, label: "PENDING", value: "5", diff: "AWAITING AUTH", up: false },
              ].map((stat, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                  key={stat.label}
                  className="rounded-[32px] bg-[#1E293B] p-5 hover:bg-[#0F172A] transition-all duration-300 flex flex-col justify-between shadow-lg shadow-[#1E293B]/10 min-h-[140px]"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.up ? 'bg-[#10B981]/10 text-[#10B981]' : (stat.label === 'PENDING' ? 'bg-amber-500/10 text-amber-400' : 'bg-[#EF4444]/10 text-[#EF4444]')}`}>
                    <stat.icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#94A3B8] mb-1">{stat.label}</p>
                    <p className="font-mono font-black text-2xl text-white">{stat.value}</p>
                  </div>
                  <div className={`text-[9px] font-bold uppercase tracking-wider mt-2.5 flex items-center gap-1 ${stat.up ? 'text-[#10B981]' : (stat.label === 'PENDING' ? 'text-amber-400' : 'text-[#EF4444]')}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current inline-block shrink-0" />
                    {stat.diff}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top Customers Panel */}
            <div className="flex flex-col gap-3 mt-2">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#94A3B8] ml-1">
                TOP CUSTOMERS
              </h3>
              
              <div className="rounded-[24px] bg-white border border-[#E2E8F0] p-1.5 shadow-sm">
                {CUSTOMERS.map((cust) => (
                  <div 
                    key={cust.name} 
                    className="p-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-[13px] font-black tracking-wide shrink-0 ${cust.color}`}>
                        {cust.initials}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[14px] text-[#0F172A] leading-tight">{cust.name}</h4>
                        <p className="text-[11px] font-bold text-[#94A3B8] mt-0.5">{cust.purchases}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-mono text-[14px] font-black text-[#10B981]">{cust.amount}</p>
                      <p className="text-[9px] text-[#10B981] font-bold uppercase tracking-widest mt-0.5">{cust.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </AppLayout>
  );
}
