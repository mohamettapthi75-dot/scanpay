import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { 
  User, Store, ChevronRight, HelpCircle, ScanLine, 
  Send, Clock, QrCode, FileBarChart, Bell, ArrowRightLeft, ArrowLeft
} from "lucide-react";
import { useStore } from "../store";

export default function AccountType() {
  const navigate = useNavigate();
  const setAccountType = useStore(state => state.setAccountType);

  const handleSelect = (type: 'customer' | 'merchant') => {
    setAccountType(type);
    if (type === 'merchant') {
      navigate('/merchant-category');
    } else {
      navigate('/home');
    }
  };

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A] flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">

      <div className="flex-1 px-5 pt-[calc(20px+env(safe-area-inset-top))] pb-8 w-full flex flex-col relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-center w-full mb-6 relative z-10">
          <button 
            onClick={() => navigate('/register')} 
            className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 active:scale-95 transition-all outline-none cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button 
            type="button"
            className="px-4 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-sm text-[12px] font-bold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </button>
        </header>

        {/* Hero Title */}
        <div className="mb-6 shrink-0 text-left">
          <h2 className="text-[28px] font-black text-[#0F172A] tracking-tight leading-[1.1] mb-2 font-display">
            How will you use <br/> <span className="text-[#E8192C]">ScanPay?</span>
          </h2>
          <p className="text-[13px] text-[#64748B] font-semibold tracking-wide">
            Choose the option that describes you best.
          </p>
        </div>

        {/* Option Grid */}
        <div className="flex flex-col gap-4 w-full mb-auto mt-2">
          
          {/* Customer Choice Card */}
          <button 
            type="button"
            onClick={() => handleSelect('customer')}
            className="w-full rounded-[24px] bg-white border-2 border-transparent hover:border-[#E8192C]/20 p-5 flex flex-col relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer text-left group active:scale-[0.98]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F8F9FC] border border-[#E2E8F0] flex items-center justify-center group-hover:bg-[#E8192C]/5 group-hover:border-[#E8192C]/20 transition-all">
                <User className="w-6 h-6 text-[#0F172A] group-hover:text-[#E8192C] transition-colors" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-[16px] font-bold text-[#0F172A] mb-0.5">
                  Personal Account
                </h3>
                <p className="text-[12px] text-[#64748B] leading-tight font-medium">
                  Send money & scan to pay.
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#F8F9FC] flex items-center justify-center text-[#64748B] group-hover:text-[#E8192C] group-hover:bg-[#E8192C]/10 transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="h-[1px] bg-[#F1F5F9] w-full mb-4" />

            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex items-center gap-2 text-[11.5px] text-[#475569] font-bold">
                <ScanLine className="w-3.5 h-3.5 text-[#E8192C]" />
                Scan & Pay
              </div>
              <div className="flex items-center gap-2 text-[11.5px] text-[#475569] font-bold">
                <Send className="w-3.5 h-3.5 text-[#E8192C]" />
                Send Money
              </div>
              <div className="flex items-center gap-2 text-[11.5px] text-[#475569] font-bold">
                <Clock className="w-3.5 h-3.5 text-[#E8192C]" />
                History
              </div>
            </div>
          </button>

          {/* Merchant Choice Card */}
          <button 
            type="button"
            onClick={() => handleSelect('merchant')}
            className="w-full rounded-[24px] bg-white border-2 border-transparent hover:border-[#E8192C]/20 p-5 flex flex-col relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer text-left group active:scale-[0.98]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F8F9FC] border border-[#E2E8F0] flex items-center justify-center group-hover:bg-[#E8192C]/5 group-hover:border-[#E8192C]/20 transition-all">
                <Store className="w-6 h-6 text-[#0F172A] group-hover:text-[#E8192C] transition-colors" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-[16px] font-bold text-[#0F172A] mb-0.5">
                  Business Account
                </h3>
                <p className="text-[12px] text-[#64748B] leading-tight font-medium">
                  Receive payments instantly.
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#F8F9FC] flex items-center justify-center text-[#64748B] group-hover:text-[#E8192C] group-hover:bg-[#E8192C]/10 transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="h-[1px] bg-[#F1F5F9] w-full mb-4" />

            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex items-center gap-2 text-[11.5px] text-[#475569] font-bold">
                <QrCode className="w-3.5 h-3.5 text-[#E8192C]" />
                Receive Payments
              </div>
              <div className="flex items-center gap-2 text-[11.5px] text-[#475569] font-bold">
                <FileBarChart className="w-3.5 h-3.5 text-[#E8192C]" />
                Analytics
              </div>
            </div>
          </button>
        </div>

        {/* Dynamic workspace persistent switch feedback banner */}
        <div className="rounded-[16px] border border-[#E2E8F0] bg-white p-4 flex items-center gap-4 text-left mt-6 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#F8F9FC] flex items-center justify-center text-[#64748B] shrink-0">
            <ArrowRightLeft className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="text-[#0F172A] font-bold text-[12px] block leading-tight">
              Flexible Workspace Profile
            </span>
            <p className="text-[#64748B] text-[11px] leading-tight font-medium mt-0.5">
              You can switch account type from settings anytime later.
            </p>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}
