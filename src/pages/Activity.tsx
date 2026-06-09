import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { useStore } from "../store";

const TRANSACTIONS = [
  { id: 1, init: "HA", name: "Hargeisa Cafe", date: "Today, 10:45 AM", amount: "-$4.50", type: "out", status: "Paid", color: "bg-[#F8F9FC] text-[#0F172A] border-[#E2E8F0]" },
  { id: 2, init: "AH", name: "Ahmed Retail", date: "Yesterday, 7:20 PM", amount: "-$12.00", type: "out", status: "Paid", color: "bg-[#F8F9FC] text-[#0F172A] border-[#E2E8F0]" },
  { id: 3, init: "MA", name: "Market Square", date: "May 19, 2026", amount: "-$8.75", type: "out", status: "Paid", color: "bg-[#F8F9FC] text-[#0F172A] border-[#E2E8F0]" },
  { id: 4, init: "AA", name: "Abdirahman Ali", date: "May 18, 2026", amount: "+$25.00", type: "in", status: "Received", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
];

export default function Activity() {
  const navigate = useNavigate();
  const accountType = useStore(state => state.accountType);
  const isMerchant = accountType === "merchant";
  
  const [activeTab, setActiveTab] = useState<'all' | 'out' | 'in'>('all');

  const filteredTransactions = TRANSACTIONS.filter(txn => {
    if (activeTab === 'all') return true;
    return txn.type === activeTab;
  });

  return (
    <AppLayout className="flex flex-col h-full bg-[#F8F9FC] text-[#0F172A] relative">
      
      <div className="pt-[calc(20px+env(safe-area-inset-top))] px-5 pb-4 relative z-10 w-full mb-2">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[18px] font-bold text-[#0F172A] flex-1 font-display">History Log</h1>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded-[16px] p-1.5 mb-5 w-full max-w-[300px]">
          {['all', 'out', 'in'].map((tab) => {
            const isActive = activeTab === tab;
            return (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-1.5 text-[12px] font-bold rounded-[12px] transition-all relative z-10 cursor-pointer ${isActive ? 'text-white' : 'text-[#64748B] hover:text-[#0F172A]'}`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-[#0F172A] rounded-[12px] shadow-sm -z-10" />
                )}
                {tab === 'all' ? 'All' : tab === 'out' ? 'Sent' : 'Received'}
              </button>
            );
          })}
        </div>

        {/* Search Input Widget */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] group-focus-within:text-[#0F172A] transition-colors z-10" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full h-[48px] rounded-[16px] bg-white border border-[#E2E8F0] focus:border-[#0F172A]/30 focus:shadow-sm pl-11 pr-11 text-[13px] text-[#0F172A] font-bold placeholder-[#94A3B8] focus:outline-none transition-all shadow-sm"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] transition-colors z-10 p-1 cursor-pointer">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-[100px] mb-8 block relative z-10 no-scrollbar w-full">
        <div className="rounded-[24px] bg-white border border-[#E2E8F0] p-2 shadow-sm">
          {filteredTransactions.map((txn, idx) => (
            <div 
              key={txn.id} 
              className="flex items-center justify-between p-3.5 rounded-[16px] hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-[14px] border flex items-center justify-center text-[12px] font-bold shrink-0 ${txn.color}`}>
                  {txn.init}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0F172A] leading-tight mb-0.5">{txn.name}</p>
                  <p className="text-[11px] text-[#64748B] font-medium leading-none">{txn.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-mono text-[14px] font-black ${txn.amount.includes('+') ? 'text-emerald-600' : 'text-[#0F172A]'}`}>{txn.amount}</p>
                <p className={`text-[10px] font-extrabold uppercase tracking-wide mt-1 ${txn.status === 'Paid' ? 'text-[#64748B]' : 'text-emerald-600'}`}>{txn.status}</p>
              </div>
            </div>
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#F8F9FC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B]">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-[#64748B] text-[12px] font-bold">No activity found.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
