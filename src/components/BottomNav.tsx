import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home as HomeIcon, Clock, User, PieChart } from "lucide-react";
import { motion } from "motion/react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  
  const NAV_ITEMS = [
    { label: "Home", path: "/home", icon: HomeIcon },
    { label: "Analytics", path: "/analytics", icon: PieChart },
    { label: "Activity", path: "/activity", icon: Clock },
    { label: "Profile", path: "/profile", icon: User }
  ];

  const handleNavigate = (path: string) => {
    if (location !== path && !location.startsWith(path + '/')) {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(24);
      }
      navigate(path);
    }
  };

  return (
    <div className="absolute md:hidden bottom-0 left-0 right-0 z-50 bg-white border-t-[0.5px] border-[#E2E8F0] pb-safe">
      <div className="flex justify-between items-center h-[72px] px-2 max-w-[500px] mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location === "/" && item.path === "/home" ? true : location === item.path || (item.path !== "/home" && location.startsWith(item.path));
          const textColor = isActive ? "text-[#E8192C]" : "text-[#94A3B8]";
          const iconColor = isActive ? "text-[#E8192C]" : "text-[#94A3B8]";
 
          return (
            <button 
              key={item.path}
              onClick={() => handleNavigate(item.path)} 
              className={`flex-1 min-w-[64px] h-full flex flex-col items-center justify-center relative z-10 ${textColor} outline-none cursor-pointer`}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex flex-col items-center justify-center relative w-full h-full">
                {isActive && (
                  <motion.div 
                    layoutId="navbarActiveIndicator"
                    transition={{ type: "spring", stiffness: 450, damping: 24 }}
                    className="absolute top-0 w-8 h-1 rounded-b-full bg-[#E8192C]"
                  />
                )}
                
                <div className="flex items-center justify-center mt-1">
                  <item.icon className={`w-6 h-6 ${iconColor} ${isActive ? 'fill-current' : 'fill-transparent stroke-[1.8]'}`} />
                </div>
                
                <span className={`text-[10px] font-medium tracking-wide mt-1.5 transition-colors ${isActive ? "text-[#E8192C] font-semibold" : "text-[#94A3B8]"}`}>
                  {item.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
