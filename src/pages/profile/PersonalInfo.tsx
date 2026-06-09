import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { ArrowLeft, User, Camera, Mail, MapPin, Save } from "lucide-react";
import { useStore } from "../../store";
import toast from 'react-hot-toast';

export default function PersonalInfo() {
  const navigate = useNavigate();
  const { userName, userPhone } = useStore();
  
  const [name, setName] = useState(userName || "Ahmed Hassan");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    toast.success('Profile updated successfully!');
    setTimeout(() => navigate(-1), 1500);
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
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-md flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xs font-black tracking-[0.2em] uppercase text-white">Personal Info</h1>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-32 md:pb-8 block relative z-10 no-scrollbar w-full max-w-xl mx-auto space-y-6 mt-6">
        
        {/* Profile Image representation */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] bg-[#0c0e1a]/85 border border-white/[0.08] flex items-center justify-center text-3xl font-black text-white shadow-2xl">
              {name.substring(0,2).toUpperCase() || "AH"}
            </div>
            <button className="absolute bottom-[-2px] right-[-2px] w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-400 border border-[#03040B] flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.6)] text-white transition-all active:scale-95 cursor-pointer">
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inputs list */}
        <div className="bg-[#0c0e1a]/85 border border-white/[0.08] rounded-[2rem] p-5 shadow-2xl space-y-5 relative">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500/10 via-sky-400/5 to-transparent" />
          
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 mb-2 block">Full Name</label>
            <div className="flex items-center bg-white/[0.03] border border-white/[0.08] focus-within:border-blue-500/30 rounded-2xl h-14 px-4 transition-colors">
              <User className="w-4.5 h-4.5 text-blue-400 mr-3" />
              <input
                type="text"
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-slate-500 focus:ring-0"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 mb-2 block">Phone Number (Verified)</label>
            <div className="flex items-center bg-white/[0.01] border border-white/[0.05] rounded-2xl h-14 px-4 opacity-50">
              <span className="text-blue-400 font-mono text-sm mr-3 font-semibold">+252</span>
              <input
                type="text"
                disabled
                className="bg-transparent border-none outline-none text-white/70 text-sm w-full font-mono focus:ring-0"
                value={userPhone || ""}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 mb-2 block">Email Address</label>
            <div className="flex items-center bg-white/[0.03] border border-white/[0.08] focus-within:border-blue-500/30 rounded-2xl h-14 px-4 transition-colors">
              <Mail className="w-4.5 h-4.5 text-blue-400 mr-3" />
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-600 focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 mb-2 block">Address</label>
            <div className="flex items-center bg-white/[0.03] border border-white/[0.08] focus-within:border-blue-500/30 rounded-2xl h-14 px-4 transition-colors">
              <MapPin className="w-4.5 h-4.5 text-blue-400 mr-3" />
              <input
                type="text"
                placeholder="District, City"
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-slate-600 focus:ring-0"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center shadow-[0_5px_15px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Save className="w-4 w-4 mr-2 stroke-[2.2]" />
          Save Changes
        </button>
      </div>
    </PageWrapper>
  );
}
