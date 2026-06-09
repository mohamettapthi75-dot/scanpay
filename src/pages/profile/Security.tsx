import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowLeft, Lock, Fingerprint, ScanFace, EyeOff } from "lucide-react";
import { useStore } from "../../store";
import toast from 'react-hot-toast';

export default function Security() {
  const navigate = useNavigate();
  const { accountType } = useStore();
  const isMerchant = accountType === "merchant";

  const [biometrics, setBiometrics] = useState(true);
  const [faceId, setFaceId] = useState(false);
  const [appLock, setAppLock] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setter(!value);
    toast.success('Setting updated');
  };

  return (
    <PageWrapper className="bg-[#03040B] text-white flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">
      {/* Background ambient glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="pt-8 px-6 pb-4 relative z-10 w-full max-w-xl mx-auto border-b border-white/[0.08]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-md flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xs font-black tracking-[0.2em] uppercase text-white">Security & Privacy</h1>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-32 md:pb-8 block relative z-10 no-scrollbar w-full max-w-xl mx-auto space-y-6 mt-6">
        
        {/* PIN Management */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">PIN & Access</h3>
          <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-[2rem] p-2.5 shadow-2xl relative overflow-hidden">
            <button className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/[0.04] transition-colors cursor-pointer text-left">
              <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 font-bold shrink-0">
                    <Lock className="w-4.5 h-4.5 stroke-[2.2]" />
                 </div>
                 <div>
                   <p className="font-black text-xs text-white uppercase tracking-wide">Change PIN</p>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Update your 4-digit security PIN</p>
                 </div>
              </div>
            </button>
            
            <div className="flex items-center justify-between p-3.5 rounded-2xl">
              <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 font-bold shrink-0">
                    <Lock className="w-4.5 h-4.5 stroke-[2.2]" />
                 </div>
                 <div>
                   <p className="font-black text-xs text-white uppercase tracking-wide">App Lock</p>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Require PIN/Biometrics on open</p>
                 </div>
              </div>
              <Toggle active={appLock} onClick={() => handleToggle(setAppLock, appLock)} />
            </div>
          </div>
        </section>

        {/* Biometrics */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Biometrics</h3>
          <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-[2rem] p-2.5 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between p-3.5 rounded-2xl">
              <div className="flex items-center gap-3">
                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors border ${biometrics ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' : 'text-slate-400 border-white/[0.08] bg-white/[0.04]'} shrink-0`}>
                    <Fingerprint className="w-4.5 h-4.5 stroke-[2.2]" />
                 </div>
                 <div>
                   <p className="font-black text-xs text-white uppercase tracking-wide">Fingerprint Login</p>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Use fingerprint to authenticate</p>
                 </div>
              </div>
              <Toggle active={biometrics} onClick={() => handleToggle(setBiometrics, biometrics)} />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl">
              <div className="flex items-center gap-3">
                 <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors border ${faceId ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' : 'text-slate-400 border-white/[0.08] bg-white/[0.04]'} shrink-0`}>
                    <ScanFace className="w-4.5 h-4.5 stroke-[2.2]" />
                 </div>
                 <div>
                   <p className="font-black text-xs text-white uppercase tracking-wide">Face ID</p>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Use facial recognition</p>
                 </div>
              </div>
              <Toggle active={faceId} onClick={() => handleToggle(setFaceId, faceId)} />
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Privacy</h3>
          <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-[2rem] p-2.5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between p-3.5 rounded-2xl">
              <div className="flex items-center gap-3">
                 <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400 shrink-0">
                    <EyeOff className="w-4.5 h-4.5 stroke-[2.2]" />
                 </div>
                 <div>
                   <p className="font-black text-xs text-white uppercase tracking-wide">Hide Balances on Open</p>
                   <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Obscure amounts by default</p>
                 </div>
              </div>
              <Toggle active={hideBalance} onClick={() => handleToggle(setHideBalance, hideBalance)} />
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}

function Toggle({ active, onClick }: { active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${active ? 'bg-blue-500' : 'bg-slate-800 border border-white/[0.05]'}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white transition-all shadow-md ${active ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}
