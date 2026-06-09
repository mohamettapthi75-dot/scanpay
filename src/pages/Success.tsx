import { useLocation, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { CheckCircle2 } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name = "Hargeisa Cafe", amount = "4.50" } = location.state || {};

  return (
    <PageWrapper className="justify-center items-center px-6 bg-[#F8F9FC] text-[#0F172A] max-w-sm mx-auto w-full relative overflow-y-auto no-scrollbar">

      <div className="w-full bg-white border border-[#E2E8F0] rounded-[32px] p-8 flex flex-col justify-center items-center text-center shadow-lg relative z-10 overflow-hidden mt-6">
        
        <div className="relative mb-6 mt-2">
          <div className="w-24 h-24 bg-[#EF4444] rounded-full flex items-center justify-center shadow-md animate-pulse relative z-10">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <div className="absolute inset-0 border-4 border-[#EF4444]/30 rounded-full scale-125 animate-ping z-0"></div>
        </div>
        
        <h2 className="text-[22px] font-bold tracking-tight text-[#0F172A] mb-2 font-display">Payment Success</h2>
        <p className="text-[#64748B] text-[13px] px-2 mb-8 font-medium">Your transaction to <strong className="text-[#0F172A]">{name}</strong> was completed successfully.</p>
        
        <div className="w-full space-y-3 mb-10">
          <div className="flex justify-between items-center py-2 border-b border-[#E2E8F0] border-dashed">
            <span className="text-[#64748B] font-bold text-[13px] uppercase tracking-wider">Amount</span>
            <span className="font-mono text-[24px] text-[#0F172A] font-black leading-none">${amount}</span>
          </div>
          <div className="flex justify-between items-center py-2.5 bg-[#F8F9FC] px-4 rounded-[12px]">
            <span className="text-[#64748B] font-bold text-[12px] uppercase tracking-wider">TXN ID</span>
            <span className="font-mono text-[#0F172A] font-bold text-[13px]">#SP-992384-SL</span>
          </div>
          <div className="flex justify-between items-center py-2.5 bg-[#F8F9FC] px-4 rounded-[12px]">
            <span className="text-[#64748B] font-bold text-[12px] uppercase tracking-wider">Date</span>
            <span className="text-[#0F172A] font-mono font-medium text-[13px]">{new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="w-full h-[56px] bg-[#E8192C] text-white font-bold text-[16px] rounded-[16px] shadow-[0_4px_20px_rgba(232,25,44,0.35)] active:scale-[0.97] transition-all cursor-pointer flex justify-center items-center hover:bg-[#D61528]"
        >
          Return Home
        </button>
      </div>
    </PageWrapper>
  );
}
