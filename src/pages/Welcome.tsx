import React from "react";
import { useNavigate } from "react-router-dom";
import { ScanLine, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-[#E8192C] text-white overflow-y-auto no-scrollbar relative min-h-[0px]">
      <div className="min-h-full flex flex-col items-center justify-between px-6 py-[calc(24px+env(safe-area-inset-top))] pb-8 relative">
        {/* Decorative clean background highlights */}
        <div className="absolute top-[-10%] right-[-20%] w-[80%] h-[40%] bg-white/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-20%] w-[60%] h-[30%] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Fill Empty Space for balanced spacing */}
        <div className="w-full flex justify-end relative z-10 shrink-0">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-white/70 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest mt-2"
          >
            Admin
          </button>
        </div>

        {/* Brand identity */}
        <div className="flex flex-col items-center z-10 w-full pt-8 pb-10 shrink-0">
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 relative"
          >
            <motion.div
               animate={{ rotate: [0, 5, -5, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
               <ScanLine className="w-12 h-12 text-[#E8192C]" />
            </motion.div>
            <motion.div 
              animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-2 right-2 w-2 h-2 bg-[#E8192C] rounded-full" 
            />
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tight mb-2 font-display">
            ScanPay
          </h1>
          <p className="text-white/90 font-medium text-center text-sm px-6 leading-relaxed">
            Pay instantly with<br/><span className="bg-white text-[#E8192C] font-bold px-2.5 py-0.5 rounded-full mt-1.5 inline-block text-[13px] shadow-sm">Golis Sahal</span>
          </p>

          <div className="w-full max-w-[240px] mt-10 space-y-4 text-[13px] font-bold text-white/90">
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">✓</div>
               <span>Instant Payments</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">✓</div>
               <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">✓</div>
               <span>Verified Accounts Only</span>
            </div>
          </div>
        </div>

        {/* Action Button Controls */}
        <div className="w-full space-y-4 z-10 mt-auto bg-white p-6 rounded-[28px] shadow-2xl shrink-0">
          <button
            onClick={() => navigate('/register')}
            className="w-full h-[56px] rounded-[16px] bg-[#E8192C] text-white font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.97] shadow-[0_4px_20px_rgba(232,25,44,0.35)] cursor-pointer"
          >
            Get Started
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="w-full h-[56px] rounded-[16px] bg-transparent text-[#0F172A] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.97] hover:bg-gray-50 cursor-pointer"
          >
            I <span className="underline decoration-[#E8192C] decoration-2 underline-offset-4 font-black mx-1">Already Have</span> an Account
          </button>
        </div>
      </div>
    </div>
  );
}
