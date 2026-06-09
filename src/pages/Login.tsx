import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { ChevronDown, Lock, Eye, EyeOff, Smartphone, ShieldCheck, QrCode, ArrowLeft } from "lucide-react";
import { useStore } from "../store";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const login = useStore(state => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 4) {
      toast.error("Please enter a valid Golis Sahal number");
      return;
    }
    if (pin.length < 4) {
      toast.error("PIN must be 4 digits");
      return;
    }
    login(phone, pin);
    toast.success("Welcome back!");
    navigate("/home");
  };

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A] flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">

      <div className="w-full pt-[calc(20px+env(safe-area-inset-top))] px-5 pb-2 flex items-center justify-between relative z-20">
        <button 
          onClick={() => navigate('/welcome')} 
          className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 active:scale-95 transition-all outline-none cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col flex-grow items-center px-6 py-6 max-w-sm mx-auto w-full font-sans relative z-10">
        
        {/* Brand Header */}
        <div className="text-left w-full mb-8">
          <h1 className="text-[32px] font-black text-[#0F172A] tracking-tight leading-tight mb-2 font-display">
            Welcome <br/> <span className="text-[#E8192C]">Back!</span>
          </h1>
          <p className="text-[13px] font-medium text-[#64748B]">
            Login to continue to your account
          </p>
        </div>

        {/* Premium form box */}
        <div className="w-full rounded-[24px] bg-white border border-[#E2E8F0] p-6 flex flex-col shadow-sm relative">
          
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            
            {/* Phone input with country prefix */}
            <div>
               <label className="text-[12px] font-bold text-[#64748B] mb-1.5 block px-1">Phone Number</label>
               <div className="flex items-center bg-[#F8F9FC] rounded-[16px] border border-[#E2E8F0] focus-within:border-[#E8192C]/50 focus-within:bg-white transition-colors h-[56px] w-full group">
                 <div className="flex items-center px-4 gap-1.5 border-r border-[#E2E8F0] shrink-0 h-8 text-[13px] font-bold text-[#0F172A]">
                   <span className="font-mono">+252</span>
                   <ChevronDown className="w-4 h-4 text-[#64748B]" />
                 </div>
                 
                 <input
                   type="tel"
                   placeholder="90 712 3456"
                   className="bg-transparent border-none outline-none text-[#0F172A] text-[15px] font-bold font-mono w-full px-4 placeholder:text-gray-300 focus:ring-0"
                   value={phone}
                   onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                   required
                 />
               </div>
            </div>

            {/* PIN selector */}
            <div>
               <label className="text-[12px] font-bold text-[#64748B] mb-1.5 block px-1">Security PIN</label>
               <div className="relative">
                 <div className="flex items-center bg-[#F8F9FC] rounded-[16px] border border-[#E2E8F0] focus-within:border-[#E8192C]/50 focus-within:bg-white transition-colors h-[56px] w-full px-4 group">
                   <Lock className="w-5 h-5 text-[#64748B] mr-3 shrink-0 group-focus-within:text-[#E8192C] transition-colors" />
                   <input
                     type={showPin ? "text" : "password"}
                     maxLength={4}
                     placeholder="••••"
                     className="bg-transparent border-none outline-none text-[#0F172A] text-[18px] font-black font-mono w-full placeholder:text-gray-300 tracking-[0.2em] focus:ring-0"
                     value={pin}
                     onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                     required
                   />
                   <button 
                     type="button" 
                     onClick={() => setShowPin(!showPin)}
                     className="text-[#64748B] hover:text-[#0F172A] transition-colors outline-none ml-2 shrink-0 p-1"
                   >
                     {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                   </button>
                 </div>
               </div>
            </div>

            {/* Forgot PIN Link */}
            <div className="flex justify-end mt-1">
              <button 
                type="button" 
                onClick={() => toast.success("For demo purposes, any phone + PIN will sign in.")}
                className="text-[11.5px] text-[#E8192C] hover:underline transition-all font-bold"
              >
                Forgot PIN?
              </button>
            </div>

            {/* Main CTA: LOGIN */}
            <button
              type="submit"
              disabled={phone.length < 4 || pin.length < 4}
              className="w-full h-[56px] mt-4 rounded-[16px] bg-[#E8192C] disabled:opacity-50 disabled:active:scale-100 text-white font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.97] shadow-[0_4px_20px_rgba(232,25,44,0.35)] cursor-pointer"
            >
              Login securely
            </button>

            {/* OR visual divider */}
            <div className="flex items-center justify-center gap-3 my-2">
              <div className="h-[1px] bg-[#E2E8F0] flex-1" />
              <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider">or sign in with</span>
              <div className="h-[1px] bg-[#E2E8F0] flex-1" />
            </div>

            {/* Secondary Option: Scan QR to Login */}
            <button
              type="button"
              onClick={() => navigate("/scan")}
              className="w-full h-[56px] rounded-[16px] bg-[#F8F9FC] hover:bg-gray-100 border border-[#E2E8F0] text-[#0F172A] font-bold text-[14px] flex items-center justify-center transition-all cursor-pointer active:scale-[0.97]"
            >
              <QrCode className="w-5 h-5 mr-2.5 text-[#0F172A]" />
              Scan QR Code
            </button>
          </form>
        </div>
        
        {/* Sign up links */}
        <div className="mt-8 text-center text-[13px] font-medium text-[#64748B] shrink-0">
          Don't have an account? <span onClick={() => navigate('/register')} className="text-[#E8192C] ml-1 font-bold hover:underline cursor-pointer">Sign up</span>
        </div>

        {/* Footer Golis Secure */}
        <div className="flex flex-col items-center justify-center mt-12 pb-6">
          <div className="w-10 h-10 rounded-full bg-[#E8192C]/10 flex items-center justify-center mb-2">
             <ShieldCheck className="w-5 h-5 text-[#E8192C]" />
          </div>
          <span className="text-[10px] text-[#64748B] font-bold tracking-widest uppercase">Secured by Golis Sahal</span>
        </div>
      </div>
    </PageWrapper>
  );
}
