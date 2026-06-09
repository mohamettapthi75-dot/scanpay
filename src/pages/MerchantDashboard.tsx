import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Bell, 
  ChevronDown, 
  Eye, 
  ScanLine, 
  Ticket,
  MessageCircle,
  PhoneCall,
  TrendingUp, 
  Users, 
  ShoppingCart, 
  ChevronRight,
  Home,
  Clock,
  User,
  ShieldCheck,
  Building2,
  CheckCircle2,
  LifeBuoy
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import AppLogo from "../components/AppLogo";

export default function MerchantDashboard() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A] relative overflow-y-auto overflow-x-hidden no-scrollbar pb-24 h-[100dvh]">
      
      {/* Header */}
      <div className="px-6 pt-[calc(24px+env(safe-area-inset-top))] pb-4 flex flex-col gap-5 z-20 relative">
        <div className="flex justify-between items-center w-full">
          <button onClick={() => navigate('/my-code')} className="flex items-center gap-2 active:scale-95 transition-transform text-left">
            <div className="w-9 h-9 rounded-[10px] bg-[#E8192C] flex items-center justify-center shrink-0 shadow-sm border border-[#E8192C]">
               <ScanLine className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-black tracking-tight text-[#0F172A] leading-none">ScanPay</span>
              <span className="text-[9px] font-bold text-[#64748B] italic tracking-tight leading-loose">Powered by Golis Sahal</span>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-[#0F172A]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8192C] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#F8F9FC]">3</div>
            </div>
            <div className="relative border-2 border-white rounded-full shadow-sm">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E8192C]/20 to-[#EF4444]/20 flex items-center justify-center overflow-hidden">
                <Building2 className="w-5 h-5 text-[#E8192C]" />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-[#0F172A] font-display flex items-center gap-2">
            Hello, Abdullahi <span className="text-2xl animate-waving-hand">👋</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[#64748B] font-medium text-[15px]">Merchant Dashboard</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8192C]"></div>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-full w-fit shadow-sm active:scale-95 transition-transform cursor-pointer">
          <Building2 className="w-4 h-4 text-[#E8192C]" />
          <span className="text-[13px] font-bold text-[#0F172A]">Business Mode • Fuel Station</span>
          <ChevronDown className="w-4 h-4 text-[#64748B]" />
        </button>
      </div>

      {/* Wallet Balance Card */}
      <div className="px-6 relative z-10">
        <div className="w-full h-[180px] rounded-[24px] bg-gradient-to-br from-[#E8192C] to-[#B01221] shadow-[0_15px_30px_rgba(232,25,44,0.25)] relative overflow-hidden flex flex-col justify-between p-6">
          <div className="absolute top-0 right-0 bottom-0 w-[60%] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          
          {/* Subtle Glow inside card */}
          <div className="absolute -top-[50%] -left-[20%] w-[150%] h-[150%] bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform rotate-12 pointer-events-none"></div>

          <div className="flex justify-between items-start relative z-10 w-full">
            <div className="flex items-center gap-2 text-white/90">
              <span className="font-semibold text-[14px]">Wallet Balance</span>
              <Eye className="w-4 h-4" />
            </div>
            <span className="text-white/90 font-bold italic text-sm tracking-tight font-display">Golis Sahal</span>
          </div>

          <div className="relative z-10 mt-1">
            <h2 className="text-[44px] font-black text-white tracking-tight leading-none font-display">
              $8,450.25
            </h2>
          </div>

          <div className="flex items-center justify-between w-full relative z-10 mt-2">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">USD • Golis Sahal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">100% Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Merchant Support Actions */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-[#0F172A] font-display">Support Portal</h3>
          <button onClick={() => navigate('/merchant-support')} className="text-[13px] font-bold text-[#E8192C] flex items-center hover:underline">
            View tickets <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => navigate('/merchant-support')} className="bg-[#FFF1F2] border border-[#FFE4E6] rounded-[24px] p-4 flex flex-col justify-center items-center gap-3 text-center active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#E8192C] flex items-center justify-center shadow-md shadow-[#E8192C]/20">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div>
               <p className="text-[14px] font-bold text-[#0F172A] leading-tight">Submit<br/>Ticket</p>
               <p className="text-[10px] text-[#64748B] font-medium mt-1">Open Issue</p>
            </div>
            <div className="mt-1 w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#FFE4E6]">
               <ChevronRight className="w-3.5 h-3.5 text-[#E8192C]" />
            </div>
          </button>

          <button className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-[24px] p-4 flex flex-col justify-center items-center gap-3 text-center active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center shadow-md shadow-[#3B82F6]/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
               <p className="text-[14px] font-bold text-[#0F172A] leading-tight">Live<br/>Chat</p>
               <p className="text-[10px] text-[#64748B] font-medium mt-1">Chat Support</p>
            </div>
            <div className="mt-1 w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#DBEAFE]">
               <ChevronRight className="w-3.5 h-3.5 text-[#3B82F6]" />
            </div>
          </button>

          <button className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-[24px] p-4 flex flex-col justify-center items-center gap-3 text-center active:scale-[0.98] transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center shadow-md shadow-[#10B981]/20">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
               <p className="text-[14px] font-bold text-[#0F172A] leading-tight">Voice<br/>Call</p>
               <p className="text-[10px] text-[#64748B] font-medium mt-1">Speak to Agent</p>
            </div>
            <div className="mt-1 w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#DCFCE7]">
               <ChevronRight className="w-3.5 h-3.5 text-[#10B981]" />
            </div>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="px-6 mt-8 overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-3 min-w-max">
           {/* Card 1 */}
           <div className="w-[160px] bg-white border border-[#E2E8F0] rounded-[20px] p-4 shadow-sm flex flex-col justify-between relative overflow-hidden">
             <div className="flex items-center gap-2 mb-2 relative z-10">
               <div className="w-6 h-6 rounded-full bg-[#10B981]/10 flex items-center justify-center shrink-0">
                 <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
               </div>
               <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Today's Sales</span>
             </div>
             <p className="text-[20px] font-black text-[#0F172A] font-display z-10 relative">$842.50</p>
             <p className="text-[11px] font-bold mt-1 z-10 relative flex items-center">
                <span className="text-[#10B981]">↑ 12.5%</span> <span className="text-[#94A3B8] font-medium ml-1">vs yesterday</span>
             </p>
             {/* Fake small chart line */}
             <svg className="absolute bottom-2 right-2 w-16 h-8 text-[#10B981]/20 z-0" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 30 Q 15 35, 30 20 T 60 10 T 100 5 V 40 H 0 Z" fill="currentColor"/>
               <path d="M0 30 Q 15 35, 30 20 T 60 10 T 100 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
             </svg>
           </div>

           {/* Card 2 */}
           <div className="w-[160px] bg-white border border-[#E2E8F0] rounded-[20px] p-4 shadow-sm flex flex-col justify-between relative overflow-hidden">
             <div className="flex items-center gap-2 mb-2 relative z-10">
               <div className="w-6 h-6 rounded-full bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
                 <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
               </div>
               <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Customers</span>
             </div>
             <p className="text-[20px] font-black text-[#0F172A] font-display z-10 relative">48</p>
             <p className="text-[11px] font-bold mt-1 z-10 relative flex items-center">
                <span className="text-[#10B981]">↑ 8.3%</span> <span className="text-[#94A3B8] font-medium ml-1">vs yesterday</span>
             </p>
             {/* Fake small chart line */}
             <svg className="absolute bottom-2 right-2 w-16 h-8 text-[#3B82F6]/20 z-0" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 25 Q 20 30, 40 15 T 70 20 T 100 0 V 40 H 0 Z" fill="currentColor"/>
               <path d="M0 25 Q 20 30, 40 15 T 70 20 T 100 0" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
             </svg>
           </div>

           {/* Card 3 */}
           <div className="w-[160px] bg-white border border-[#E2E8F0] rounded-[20px] p-4 shadow-sm flex flex-col justify-between relative overflow-hidden">
             <div className="flex items-center gap-2 mb-2 relative z-10">
               <div className="w-6 h-6 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                 <ShoppingCart className="w-3.5 h-3.5 text-[#F59E0B]" />
               </div>
               <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Total Txns</span>
             </div>
             <p className="text-[20px] font-black text-[#0F172A] font-display z-10 relative">26</p>
             <p className="text-[11px] font-bold mt-1 z-10 relative flex items-center">
                <span className="text-[#10B981]">↑ 5.6%</span> <span className="text-[#94A3B8] font-medium ml-1">vs yesterday</span>
             </p>
             <svg className="absolute bottom-2 right-2 w-16 h-8 text-[#F59E0B]/20 z-0" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 35 Q 25 15, 50 25 T 100 5 V 40 H 0 Z" fill="currentColor"/>
               <path d="M0 35 Q 25 15, 50 25 T 100 5" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
             </svg>
           </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[17px] font-bold text-[#0F172A] font-display">Recent Transactions</h3>
          <button className="text-[13px] font-bold text-[#E8192C] flex items-center hover:underline">
            View all <ChevronRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { id: 1, name: "From Ahmed Hassan", initial: "AH", color: "bg-[#FFF1F2] text-[#E8192C]", amount: "+$120.00", status: "SUCCESS", time: "Today, 10:30 AM" },
            { id: 2, name: "To Maxamed Cali", initial: "MK", color: "bg-[#EFF6FF] text-[#3B82F6]", amount: "-$75.00", status: "SUCCESS", time: "Today, 09:45 AM" },
            { id: 3, name: "From Sahra Ali", initial: "SA", color: "bg-[#FFFBEB] text-[#F59E0B]", amount: "+$50.00", status: "SUCCESS", time: "Today, 09:15 AM" },
          ].map(tx => (
            <div key={tx.id} className="bg-white border border-[#E2E8F0] p-4 rounded-[20px] flex items-center justify-between shadow-sm cursor-pointer hover:bg-gray-50 active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3 w-full">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 ${tx.color}`}>
                  {tx.initial}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[14px] font-bold text-[#0F172A] truncate pr-2">{tx.name}</span>
                  <span className="text-[11px] font-medium text-[#64748B]">{tx.time}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[15px] font-black font-mono ${tx.amount.startsWith('+') ? 'text-[#0F172A]' : 'text-[#0F172A]'}`}>
                    {tx.amount}
                  </span>
                  <div className="flex items-center gap-1 bg-[#F0FDF4] px-2 py-0.5 rounded-md border border-[#DCFCE7]">
                    <span className="text-[9px] font-bold text-[#10B981]">{tx.status}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94A3B8] ml-1 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation spacer */}
      <div className="h-16"></div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E2E8F0] px-6 py-2 pb-[calc(8px+env(safe-area-inset-bottom))] flex justify-between items-center z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <button className="flex flex-col items-center justify-center w-16 h-12 gap-1.5 focus:outline-none group">
          <Home className="w-6 h-6 text-[#E8192C] fill-[#E8192C]/10" />
          <span className="text-[10px] font-bold text-[#E8192C]">Home</span>
        </button>
        <button onClick={() => navigate('/merchant-support')} className="flex flex-col items-center justify-center w-16 h-12 gap-1.5 focus:outline-none group cursor-pointer">
          <LifeBuoy className="w-6 h-6 text-[#94A3B8] group-hover:text-[#0F172A] transition-colors" />
          <span className="text-[10px] font-bold text-[#64748B] group-hover:text-[#0F172A] transition-colors">Support</span>
        </button>
        <button onClick={() => navigate('/activity')} className="flex flex-col items-center justify-center w-16 h-12 gap-1.5 focus:outline-none group cursor-pointer">
          <Clock className="w-6 h-6 text-[#94A3B8] group-hover:text-[#0F172A] transition-colors" />
          <span className="text-[10px] font-bold text-[#64748B] group-hover:text-[#0F172A] transition-colors">Activity</span>
        </button>
        <button onClick={() => navigate('/profile')} className="flex flex-col items-center justify-center w-16 h-12 gap-1.5 focus:outline-none group cursor-pointer">
          <User className="w-6 h-6 text-[#94A3B8] group-hover:text-[#0F172A] transition-colors" />
          <span className="text-[10px] font-bold text-[#64748B] group-hover:text-[#0F172A] transition-colors">Profile</span>
        </button>
      </div>

    </PageWrapper>
  );
}
