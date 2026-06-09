import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ArrowLeft, User, Settings, LogOut, ShieldCheck, Globe, CreditCard, HelpCircle } from "lucide-react";
import { useStore } from "../store";

export default function Profile() {
  const navigate = useNavigate();
  const userName = useStore(state => state.userName) || "Ahmed Hassan";
  const userPhone = useStore(state => state.userPhone) || "753 8881";
  const accountType = useStore(state => state.accountType);
  const logout = useStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  const actionButtons = [
    { icon: User, label: "Personal Information", desc: "Edit details", route: "/profile/personal-info" },
    { icon: CreditCard, label: "Linked Accounts", desc: "Manage networks", route: "/profile/linked-accounts" }
  ];

  const settingButtons = [
    { icon: Globe, label: "Language", desc: "English (UK)", route: "/profile/language" },
    { icon: ShieldCheck, label: "Security & Privacy", desc: "PIN, Biometrics", route: "/profile/security" },
    { icon: Settings, label: "App Settings", desc: "Notifications, sounds", route: "/profile/settings" },
    { icon: HelpCircle, label: "Help & Support", desc: "Contact us, FAQ", route: "/profile/help" }
  ];

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
          <h1 className="text-[18px] font-bold text-[#0F172A] flex-1 font-display">My Profile</h1>
        </div>

        <div className="flex items-center gap-4 bg-white border border-[#E2E8F0] p-5 rounded-[24px] shadow-sm relative">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-[18px] font-bold bg-[#F8F9FC] text-[#0F172A] border border-[#E2E8F0] shrink-0 outline outline-[3px] outline-white shadow-sm">
            <span>{userName.substring(0, 2).toUpperCase()}</span>
          </div>
          <div className="text-left flex-1">
            <h2 className="text-[16px] font-bold text-[#0F172A] leading-tight mb-0.5">{userName}</h2>
            <p className="text-[13px] text-[#64748B] font-mono tracking-wide">+252 {userPhone}</p>
          </div>
          <div className="px-2.5 py-1 bg-[#F8F9FC] border border-[#E2E8F0] rounded-[8px] text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
             {accountType}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-5 pb-[100px] mb-8 block relative z-10 no-scrollbar w-full">
        
        {/* Core details mapping cards */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm mb-6 text-left">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-4 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#E8192C]" /> Security Data
          </h3>
          <div className="grid grid-cols-2 gap-y-4 gap-x-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#64748B] mb-0.5 font-bold">Node ID</p>
              <p className="font-mono text-[13px] text-[#0F172A] font-bold">SP-{userPhone.replace(/\s/g, '')}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#64748B] mb-0.5 font-bold">Status</p>
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider">Active</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#64748B] mb-0.5 font-bold">Network</p>
              <p className="font-bold text-[#0F172A] text-[13px]">Golis Sahal</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#64748B] mb-0.5 font-bold">KYC Identity</p>
              <p className="text-[11px] uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-1">Verified</p>
            </div>
          </div>
        </div>

        {/* Action button menu widgets */}
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] ml-2 mb-3 text-left">Account</h3>
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-2 shadow-sm space-y-1 text-left">
            {actionButtons.map((btn) => (
              <button 
                key={btn.label}
                onClick={() => navigate(btn.route)} 
                className="w-full flex items-center justify-between p-3 rounded-[16px] hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-left group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-[#F8F9FC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:bg-[#E8192C]/10 group-hover:border-[#E8192C]/20 group-hover:text-[#E8192C] transition-colors">
                    <btn.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-[#0F172A]">{btn.label}</p>
                    <p className="text-[12px] text-[#64748B] font-medium leading-tight">{btn.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System config menu widgets */}
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] ml-2 mb-3 text-left">System Config</h3>
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-2 shadow-sm space-y-1 text-left">
            {settingButtons.map((btn) => (
              <button 
                key={btn.label}
                onClick={() => navigate(btn.route)} 
                className="w-full flex items-center justify-between p-3 rounded-[16px] hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-left group"
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-[#F8F9FC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:bg-[#E8192C]/10 group-hover:border-[#E8192C]/20 group-hover:text-[#E8192C] transition-colors">
                    <btn.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-[14px] text-[#0F172A]">{btn.label}</p>
                    <p className="text-[12px] text-[#64748B] font-medium leading-tight">{btn.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Logout session item */}
        <div className="mb-4">
           <button 
             onClick={handleLogout} 
             className="w-full flex items-center gap-4 p-4 bg-[#FEF2F2] border border-red-100 hover:border-red-200 active:scale-95 transition-all text-red-600 rounded-[20px] cursor-pointer"
           >
             <div className="w-10 h-10 rounded-full bg-white border border-red-100 flex items-center justify-center shrink-0 shadow-sm">
               <LogOut className="w-4.5 h-4.5 text-red-600" />
             </div>
             <div className="text-left">
                <span className="font-bold text-[14px] block text-red-600">Logout</span>
                <span className="text-[11px] font-medium text-red-400">Disconnect from session</span>
             </div>
           </button>
         </div>

      </div>
    </AppLayout>
  );
}
