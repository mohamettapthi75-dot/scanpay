import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Store, QrCode, ShieldAlert, 
  Settings, LogOut, Bell, Search, Menu, 
  Activity, Ticket, FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../../store';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminAuthenticated = useStore(state => state.isAdminAuthenticated);
  const logoutAdmin = useStore(state => state.logoutAdmin);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const MENU_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Merchants", icon: Store, path: "/admin/merchants" },
    { label: "Transactions", icon: FileText, path: "/admin/transactions" },
    { label: "QR Management", icon: QrCode, path: "/admin/qr" },
    { label: "Fraud Detection", icon: ShieldAlert, path: "/admin/fraud" },
    { label: "System Logs", icon: Activity, path: "/admin/system" },
    { label: "Support Tickets", icon: Ticket, path: "/admin/support" },
  ];

  return (
    <div className="flex h-screen w-full bg-[#060816] text-[#FFFFFF] overflow-hidden selection:bg-[#00F5FF]/30 font-sans">
      {/* Sidebar background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#00F5FF]/5 via-[#060816] to-[#060816] pointer-events-none" />
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[rgba(255,255,255,0.02)] border-r border-[#ffffff0a] backdrop-blur-xl relative z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#00F5FF] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_#00F5FF]">
            S
          </div>
          <span className="text-lg font-black tracking-widest uppercase">ScanPay Admin</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                  isActive ? 'bg-[#00F5FF]/10 text-[#00F5FF] shadow-[inset_0_0_20px_rgba(0,245,255,0.05)]' : 'text-[#94A3B8] hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 top-0 bottom-0 w-1 bg-[#00F5FF] shadow-[0_0_10px_#00F5FF]" />
                )}
                <item.icon className={`w-5 h-5 ${isActive ? 'text-[#00F5FF]' : 'group-hover:text-white'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-semibold text-sm tracking-wide">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors group"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-sm tracking-wide">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-[rgba(255,255,255,0.01)] border-b border-[#ffffff0a] backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 bg-[#ffffff05] border border-white/10 rounded-full px-4 py-2 w-64 focus-within:w-80 focus-within:border-[#00F5FF]/50 transition-all duration-300">
              <Search className="w-4 h-4 text-[#94A3B8]" />
              <input 
                type="text" 
                placeholder="Search USSD, Phone, ID..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-[#94A3B8]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-[#94A3B8] hover:text-[#00F5FF] transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#060816]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">System Admin</p>
                <p className="text-xs text-[#00F5FF]">Superuser</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#00F5FF] p-[2px]">
                <div className="w-full h-full bg-[#060816] rounded-full flex items-center justify-center font-bold text-sm">
                  SA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 no-scrollbar relative">
          {/* Subtle background blurs */}
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#3B82F6]/5 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#00F5FF]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
