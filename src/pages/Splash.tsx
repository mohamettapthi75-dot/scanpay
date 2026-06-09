import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Lock, ScanLine } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate away after 2.5 seconds to simulate loading
    const timer = setTimeout(() => {
      navigate('/welcome', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper className="justify-center items-center bg-[#F8F9FC] text-[#0F172A] relative overflow-hidden flex flex-col h-[100dvh] w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center flex-1 w-full"
      >
        {/* Animated ScanPay Logo */}
        <motion.div
           initial={{ y: 15 }}
           animate={{ y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-[100px] h-[100px] bg-white rounded-[28px] shadow-[0_15px_40px_rgba(232,25,44,0.15)] border border-[#E2E8F0] flex items-center justify-center mb-8 relative z-10 overflow-hidden"
        >
          {/* Shimmer effect across the icon */}
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-[#E8192C]/5 to-transparent skew-x-[-20deg] z-0"
          />
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <ScanLine className="w-12 h-12 text-[#E8192C]" />
          </motion.div>
          <motion.div 
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#E8192C] rounded-full z-10" 
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[32px] font-black tracking-tight text-[#0F172A] font-display mb-2 select-none"
        >
          ScanPay
        </motion.h1>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-1.5"
        >
          <Lock className="w-3 h-3 text-[#64748B]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] select-none">
            Secured by Golis Sahal
          </span>
        </motion.div>
      </motion.div>

      {/* Loading Indicator at Bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="w-full flex justify-center pb-20 shrink-0"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="animate-spin w-full h-full text-[#E8192C]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#E8192C]/20 rounded-full" />
        </div>
      </motion.div>
    </PageWrapper>
  );
}
