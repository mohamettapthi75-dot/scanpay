import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Ticket, MessageSquare, Plus, CheckCircle } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useStore } from "../store";

export default function MerchantSupport() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tickets'|'new'>('tickets');
  const [issueDesc, setIssueDesc] = useState('');
  const [priority, setPriority] = useState('NORMAL');
  const [submitted, setSubmitted] = useState(false);
  
  // Fake local state for this demo
  const [tickets, setTickets] = useState([
    { id: 'TKT-1080', issue: 'QR Code not scanning', priority: 'CRITICAL', status: 'OPEN', time: '2h ago' },
    { id: 'TKT-1021', issue: 'Missing refund for $24.50', priority: 'NORMAL', status: 'RESOLVED', time: '3d ago' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDesc.trim()) return;
    
    // Create new ticket locally
    const newTicket = {
      id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
      issue: issueDesc,
      priority,
      status: 'OPEN',
      time: 'Just now'
    };
    
    setTickets([newTicket, ...tickets]);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setIssueDesc('');
      setActiveTab('tickets');
    }, 2000);
  };

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A]">
      <div className="px-6 py-4 flex items-center justify-between border-b border-[#E2E8F0] bg-white sticky top-0 z-20">
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center hover:bg-gray-50 text-[#0F172A] active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[17px] font-bold font-display">Support Actions</span>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex bg-white rounded-xl border border-[#E2E8F0] p-1 mb-6">
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-colors ${activeTab === 'tickets' ? 'bg-[#E8192C] text-white' : 'text-[#64748B]'}`}
          >
            My Complaints
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2.5 text-[13px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 ${activeTab === 'new' ? 'bg-[#E8192C] text-white' : 'text-[#64748B]'}`}
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </div>

        {activeTab === 'tickets' ? (
          <div className="space-y-4">
             {tickets.map(tkt => (
               <div key={tkt.id} className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 shadow-sm">
                 <div className="flex items-center justify-between mb-3">
                   <span className="text-xs font-black font-mono text-[#0F172A]">{tkt.id}</span>
                   <span className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold uppercase tracking-wider ${
                     tkt.status === 'OPEN' ? 'bg-[#FFFBEB] text-[#F59E0B] border border-[#FEF3C7]' :
                     'bg-[#F0FDF4] text-[#10B981] border border-[#DCFCE7]'
                   }`}>
                     {tkt.status}
                   </span>
                 </div>
                 <p className="text-[15px] font-bold text-[#0F172A] leading-snug mb-3">
                   {tkt.issue}
                 </p>
                 <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3 mt-1">
                   <span className={`text-[11px] font-bold uppercase tracking-wider ${
                     tkt.priority === 'CRITICAL' ? 'text-[#E8192C]' : 'text-[#94A3B8]'
                   }`}>
                     {tkt.priority} Priority
                   </span>
                   <span className="text-[12px] font-medium text-[#64748B]">{tkt.time}</span>
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm">
             <div className="mb-6">
               <label className="block text-[13px] font-bold text-[#0F172A] uppercase tracking-wider mb-2">Priority Level</label>
               <div className="flex gap-3">
                 {['NORMAL', 'HIGH', 'CRITICAL'].map(p => (
                   <button
                     key={p}
                     type="button"
                     onClick={() => setPriority(p)}
                     className={`flex-1 py-3 px-2 rounded-xl text-[12px] font-bold border transition-colors ${
                       priority === p 
                       ? 'bg-[#0F172A] text-white border-[#0F172A]' 
                       : 'bg-[#F8F9FC] text-[#64748B] border-[#E2E8F0]'
                     }`}
                   >
                     {p}
                   </button>
                 ))}
               </div>
             </div>

             <div className="mb-6">
               <label className="block text-[13px] font-bold text-[#0F172A] uppercase tracking-wider mb-2">Describe Issue</label>
               <textarea
                 value={issueDesc}
                 onChange={(e) => setIssueDesc(e.target.value)}
                 placeholder="Please explain the issue you are facing..."
                 className="w-full h-32 bg-[#F8F9FC] border border-[#E2E8F0] rounded-xl p-4 text-[14px] text-[#0F172A] focus:border-[#E8192C] focus:bg-white outline-none transition-colors resize-none"
               />
             </div>

             <button
               type="submit"
               disabled={!issueDesc.trim()}
               className="w-full bg-[#E8192C] text-white font-bold h-14 rounded-full text-[16px] shadow-lg shadow-[#E8192C]/20 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
             >
               {submitted ? (
                 <>
                   <CheckCircle className="w-5 h-5" /> Submitted
                 </>
               ) : (
                 <>
                   <MessageSquare className="w-5 h-5" /> Submit Complaint
                 </>
               )}
             </button>
             <p className="text-[11px] text-[#94A3B8] text-center mt-4">
               Our Golis Sahal support team will review this and respond shortly.
             </p>
          </form>
        )}
      </div>
    </PageWrapper>
  );
}
