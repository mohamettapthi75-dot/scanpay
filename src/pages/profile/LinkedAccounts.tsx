import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useStore } from "../../store";
import toast from 'react-hot-toast';

export default function LinkedAccounts() {
  const navigate = useNavigate();
  const { linkedNetworks, primaryNetworkId, setPrimaryNetwork } = useStore();

  const handleSetPrimary = (id: string) => {
    setPrimaryNetwork(id);
    toast.success('Primary account updated');
  };

  const handleRemove = (name: string) => {
    toast.error(`${name} account removed`, { icon: <Trash2 className="w-4 h-4 text-red-500" /> });
  };

  const handleAdd = () => {
    toast('Add functionality coming soon', { icon: '🚧' })
  };

  return (
    <PageWrapper className="bg-[#03040B] text-white flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">
      {/* Background ambient glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="pt-8 px-6 pb-4 relative z-10 w-full max-w-xl mx-auto border-b border-white/[0.08]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-md flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xs font-black tracking-[0.2em] uppercase text-white">Linked Accounts</h1>
          </div>
          <button 
            onClick={handleAdd} 
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-xl flex items-center justify-center hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-32 md:pb-8 block relative z-10 no-scrollbar w-full max-w-xl mx-auto space-y-4 mt-6">
        {linkedNetworks.map((network) => (
          <div 
            key={network.id} 
            className={`p-5 bg-[#0c0e1a]/85 border ${primaryNetworkId === network.id ? 'border-blue-500/40' : 'border-white/[0.08]'} rounded-[2rem] flex flex-col shadow-2xl relative overflow-hidden`}
          >
             <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/10 to-transparent" />
             
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${network.color} border border-white/[0.08] flex items-center justify-center text-white font-black text-xs shadow-md`}>
                    {network.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-white uppercase tracking-wide">{network.name}</h3>
                    <p className="text-[9.5px] uppercase tracking-wider font-bold text-blue-400 mt-0.5">Mobile Money</p>
                  </div>
                </div>
                {primaryNetworkId === network.id && (
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
                     <CheckCircle2 className="w-3.5 h-3.5" /> Default
                  </div>
                )}
             </div>

             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider mb-0.5">Balance</p>
                   <p className="text-xl font-bold font-mono text-white">${network.balance.toFixed(2)}</p>
                </div>
                
                <div className="flex gap-2">
                  {primaryNetworkId !== network.id && (
                    <button 
                      onClick={() => handleSetPrimary(network.id)} 
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 hover:text-white text-[9.5px] uppercase font-black tracking-wider transition-all cursor-pointer"
                    >
                      Set Default
                    </button>
                  )}
                  <button 
                    onClick={() => handleRemove(network.name)} 
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-[9.5px] uppercase font-black tracking-wider transition-all cursor-pointer hover:bg-red-500/15"
                  >
                    Remove
                  </button>
                </div>
             </div>
          </div>
        ))}

        <div className="p-6 bg-[#0c0e1a]/85 border border-white/[0.08] rounded-[2rem] flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400 mb-4">
              <Plus className="w-5 h-5" />
            </div>
            <p className="font-black text-xs tracking-wider uppercase text-white">Add Secondary Golis Account</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-2 max-w-[200px] leading-relaxed">
              Link additional Golis Sahal SIM cards.
            </p>
            <button 
              onClick={handleAdd} 
              className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white font-black text-[9.5px] uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Link Account
            </button>
        </div>
      </div>
    </PageWrapper>
  );
}
