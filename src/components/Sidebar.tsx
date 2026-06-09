import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Clock, User, ChartNoAxesCombined, QrCode, LogOut } from "lucide-react";
import AppLogo from "./AppLogo";
import { useStore } from "../store";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { accountType, logout } = useStore();
  const isMerchant = accountType === "merchant";

  const NAV_ITEMS = isMerchant 
    ? [
        { label: "Dashboard", path: "/home", icon: HomeIcon },
        { label: "Transactions", path: "/activity", icon: Clock },
        { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
        { label: "Settings", path: "/profile", icon: User }
      ]
    : [
        { label: "Dashboard", path: "/home", icon: HomeIcon },
        { label: "History", path: "/activity", icon: Clock },
        { label: "Scan/Send", path: "/scan", icon: QrCode },
        { label: "Identity", path: "/profile", icon: User }
      ];

  return (
    <div className="hidden md:flex flex-col w-[280px] h-full bg-[#070913] border-r border-[#10B981]/15 relative z-50 p-6 shadow-[25px_0_60px_rgba(0,0,0,0.65)]">
       <div className="flex items-center gap-3 mb-10 px-2 mt-4 cursor-pointer" onClick={() => navigate('/home')}>
          <div className="p-1 rounded-xl bg-[#10B981]/5 border border-[#10B981]/25">
            <AppLogo className="w-8 h-8" variant="icon" />
          </div>
          <h1 className="text-xl font-black tracking-[0.18em] uppercase text-white font-display">
            <span>SCAN</span>
            <span className="text-[#10B981] ml-0.5">PAY</span>
          </h1>
       </div>
       
       <div className="flex flex-col gap-3 flex-1">
         {NAV_ITEMS.map((item) => {
           const isActive = location === "/" && item.path === "/home" ? true : location === item.path || (item.path !== "/home" && location.startsWith(item.path));
           const textColor = isActive 
             ? "text-[#10B981]" 
             : "text-slate-500 hover:text-white";
           
           return (
             <button 
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-[1.25rem] relative transition-all duration-300 w-full text-left ${textColor} group active:scale-[0.98] outline-none cursor-pointer`}
             >
               {isActive ? (
                  <div className="absolute inset-0 rounded-[1.25rem] bg-[#10B981]/[0.08] border border-[#10B981]/20 shadow-[0_4px_12px_rgba(16,185,129,0.15)]" />
               ) : (
                  <div className="absolute inset-0 rounded-[1.25rem] bg-white/[0.02] border border-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity" />
               )}
               <item.icon className="w-5 h-5 relative z-10 stroke-[2] transition-transform group-hover:scale-105" />
               <span className="text-xs font-black tracking-[0.15em] uppercase relative z-10 font-sans">{item.label}</span>
             </button>
           )
         })}
       </div>

       <div className="mt-auto mb-4">
         <button onClick={() => { logout(); navigate('/'); }} className="w-full h-12 flex items-center justify-between px-4 bg-[#111322]/40 hover:bg-[#111322] border border-[#10B981]/10 hover:border-red-500/20 transition-all rounded-[1rem] text-slate-500 hover:text-red-400 group cursor-pointer outline-none shadow-lg">
           <span className="font-extrabold uppercase tracking-[0.18em] text-[10px]">Disconnect</span>
           <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform text-slate-500 group-hover:text-red-400" />
         </button>
       </div>
    </div>
  );
}
