import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowLeft, Bell, MonitorSmartphone, Volume2, HelpCircle, MessageSquare, Info } from "lucide-react";
import { useStore } from "../../store";
import toast from 'react-hot-toast';

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useStore();

  const showToast = () => toast('Feature coming soon');

  return (
    <PageWrapper className="relative overflow-hidden bg-transparent flex flex-col h-full text-white font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="pt-8 px-6 pb-4 border-b border-white/[0.08] shrink-0 relative z-10 w-full max-w-xl mx-auto flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-black tracking-[0.15em] uppercase text-white">App Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative z-10 w-full max-w-xl mx-auto no-scrollbar">
        
        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 mb-2.5">Preferences</h3>
          <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            <SettingsItem icon={<Bell />} title="Push Notifications" subtitle="Manage incoming payment alerts" onClick={showToast} />
            <SettingsItem icon={<Volume2 />} title="Sounds & Vibration" subtitle="In-app notification sounds" onClick={showToast} />
            <SettingsItem icon={<MonitorSmartphone />} title="Theme Display" subtitle={`Current mode: ${theme === 'dark' ? 'Dark Mode' : 'Light Mode'}`} onClick={toggleTheme} />
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 mb-2.5">Support</h3>
          <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            <SettingsItem icon={<MessageSquare />} title="Live Chat" subtitle="Chat with our support team" onClick={showToast} />
            <SettingsItem icon={<HelpCircle />} title="FAQ" subtitle="Frequently asked questions" onClick={showToast} />
            <div className="w-full flex items-center justify-between p-4.5 bg-white/[0.01] border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400">
                    <Info className="w-4 h-4" />
                 </div>
                 <div className="text-left">
                    <p className="font-bold text-xs text-white">App Version</p>
                    <p className="text-[9.5px] uppercase font-mono text-sky-400 mt-0.5">v1.2.0 (Build 96)</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}

function SettingsItem({ icon, title, subtitle, onClick, disabled = false }: { icon: React.ReactNode, title: string, subtitle: string, onClick: () => void, disabled?: boolean }) {
    return (
        <button 
          onClick={onClick}
          disabled={disabled}
          className={`w-full flex items-center justify-between p-4 border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.04] active:bg-white/[0.04] transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''} cursor-pointer`}
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-sky-400">
                {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4 stroke-[2.2]" })}
             </div>
             <div className="text-left">
               <p className="font-black text-xs text-white">{title}</p>
               <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>
             </div>
          </div>
        </button>
    )
}
