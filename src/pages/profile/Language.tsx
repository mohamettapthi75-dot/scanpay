import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useStore, Language as LangType } from "../../store";
import toast from 'react-hot-toast';

const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English', region: 'UK/US' },
  { id: 'so', name: 'Somali', native: 'Af Soomaali', region: 'Somalia' },
  { id: 'ar', name: 'Arabic', native: 'عربي', region: 'Middle East', rtl: true },
];

export default function Language() {
  const navigate = useNavigate();
  const { language, setLanguage } = useStore();

  const handleSelect = (lang: LangType) => {
    setLanguage(lang);
    toast.success('Language updated');
  };

  return (
    <PageWrapper className="bg-[#03040B] text-white flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">
      {/* Background ambient glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="pt-8 px-6 pb-4 relative z-10 w-full max-w-xl mx-auto border-b border-white/[0.08]">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-md flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xs font-black tracking-[0.2em] uppercase text-white">Language</h1>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-32 md:pb-8 block relative z-10 no-scrollbar w-full max-w-xl mx-auto space-y-4 mt-6">
         <p className="text-xs text-slate-400 font-semibold leading-relaxed px-1">
           Select your preferred application language. This will update the interface instantly.
         </p>
         
         <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-[2rem] p-2.5 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/10 to-transparent" />
           {LANGUAGES.map((lang, index) => (
             <button 
               key={lang.id}
               onClick={() => handleSelect(lang.id as LangType)}
               className={`w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer ${language === lang.id ? 'bg-blue-600/10' : ''}`}
             >
               <div className="text-left">
                  <p className="font-black text-xs text-white uppercase tracking-wide">{lang.native}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{lang.name} • {lang.region}</p>
               </div>
               
               {language === lang.id ? (
                 <CheckCircle2 className="w-5 h-5 text-blue-400" />
               ) : (
                 <div className="w-4 h-4 rounded-full border border-slate-700" />
               )}
             </button>
           ))}
         </div>
      </div>
    </PageWrapper>
  );
}
