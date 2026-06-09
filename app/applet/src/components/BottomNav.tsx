import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Clock, User, ChartNoAxesCombined, QrCode } from "lucide-react";
import { useStore } from "../store";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { accountType } = useStore();
  const isMerchant = accountType === "merchant";
  
  const NAV_ITEMS = isMerchant 
    ? [
        { label: "Home", path: "/home", icon: HomeIcon },
        { label: "Activity", path: "/activity", icon: Clock },
        { label: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
        { label: "Profile", path: "/profile", icon: User }
      ]
    : [
        { label: "Home", path: "/home", icon: HomeIcon },
        { label: "Activity", path: "/activity", icon: Clock },
        { label: "Scan", path: "/scan", icon: QrCode },
        { label: "Profile", path: "/profile", icon: User }
      ];

  const handleNavigate = (path: string) => {
    if (!location.includes(path)) {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
      navigate(path);
    }
  };

  return (
    <div className="absolute md:hidden bottom-8 left-0 right-0 px-6 z-50">
      <div className="bg-white/60 backdrop-blur-[40px] border border-white/60 shadow-[0_20px_40px_rgba(15,23,42,0.12)] p-1.5 flex justify-between items-center relative overflow-hidden mx-auto max-w-[400px] rounded-[32px]">
        {NAV_ITEMS.map((item) => {
          const isActive = location === '/' && item.path === '/home' ? true : location.includes(item.path);
          const textColor = isActive ? 'text-white' : 'text-[#9CA3AF] hover:text-[#4B5563]';
          return (
            <button 
              key={item.path}
              onClick={() => handleNavigate(item.path)} 
              className={`flex-1 min-w-[72px] h-[56px] flex flex-col items-center justify-center relative transition-all duration-300 z-10 ${textColor} ${isActive ? 'scale-105' : 'scale-100'}`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(29,78,216,0.5)] border border-[#60a5fa]/50 -z-10" />
              )}
              <div className="flex flex-col items-center justify-center -translate-y-0.5">
                <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5] drop-shadow-md' : 'stroke-[1.5]'}`} />
                {isActive && (
                  <span className="text-[10px] font-black uppercase tracking-wider mt-1 opacity-90 drop-shadow-sm">
                    {item.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
