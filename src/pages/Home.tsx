import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { 
  Bell, ScanLine, QrCode, Send, MoreHorizontal, User, Store, FileBarChart, CreditCard, PieChart, Users,
  LifeBuoy
} from "lucide-react";
import { useStore } from "../store";
import { motion, AnimatePresence } from "motion/react";

const TRANSACTIONS = [
  { id: 1, initials: "AH", name: "To Ahmed Hassan", date: "Today, 10:30 AM", amount: "-$20.00", status: "Success", type: "sent" },
  { id: 2, initials: "M", name: "From Maryan", date: "Yesterday, 08:15 PM", amount: "+$50.00", status: "Success", type: "received" },
  { id: 3, initials: "S", name: "To Supermarket", date: "Yesterday, 02:30 PM", amount: "-$15.00", status: "Success", type: "sent" },
];

const MERCHANT_TRANSACTIONS = [
  { id: 1, initials: "AH", name: "Ahmed Hassan", date: "Today, 10:30 AM", amount: "+$20.50", status: "Success" },
  { id: 2, initials: "F", name: "Fatima Ali", date: "Today, 09:15 AM", amount: "+$15.00", status: "Success" },
  { id: 3, initials: "SJ", name: "Samira Jama", date: "Yesterday, 06:45 PM", amount: "+$120.00", status: "Success" },
];

const snappySpring = { type: "spring", stiffness: 450, damping: 24 };

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const childFadeIn = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: snappySpring }
};

export default function Home() {
  const navigate = useNavigate();
  const accountType = useStore(state => state.accountType);
  const isMerchant = accountType === 'merchant';
  const merchantCategory = useStore(state => state.merchantCategory);
  
  const [showBalance, setShowBalance] = useState(true);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let t = 0;
    const finalBalance = isMerchant ? 8450.25 : 125.50;
    const updateBalance = setInterval(() => {
      t += 0.05;
      if (t >= 1) {
        clearInterval(updateBalance);
        setBalance(finalBalance);
      } else {
        setBalance(Math.floor((finalBalance * t) * 100) / 100);
      }
    }, 40);
    return () => clearInterval(updateBalance);
  }, [isMerchant]);

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto pb-[calc(72px+env(safe-area-inset-bottom))] scroll-smooth no-scrollbar relative w-full bg-[#F8F9FC] text-[#0F172A]">
        
        {/* Header */}
        <header className="flex justify-between items-start px-5 pt-8 pb-4 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={snappySpring}
            className="flex flex-col gap-2"
          >
            {/* Animated Small Logo */}
            <div className="flex items-center gap-2 mb-1">
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="w-8 h-8 rounded-xl bg-[#E8192C] text-white flex items-center justify-center shadow-md relative"
              >
                <ScanLine className="w-4.5 h-4.5 stroke-[2]" />
                <motion.div 
                   animate={{ opacity: [0, 1, 0], scale: [0.8, 1.3, 0.8] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full"
                />
              </motion.div>
              <span className="font-display font-black text-[#0F172A] text-[15px] tracking-tight">ScanPay</span>
            </div>

            <div className="mt-1">
              <h1 className="text-[18px] font-bold font-display text-[#0F172A] leading-snug">
                {isMerchant ? "Merchant Dashboard" : "Hello, Abdullahi 👋"}
              </h1>
              <p className="text-xs text-[#64748B] font-medium mt-0.5">
                {isMerchant ? `Business Mode • ${merchantCategory || 'Shop'}` : "Good Morning"}
              </p>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-3 mt-1">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="relative text-[#0F172A] w-9 h-9 flex items-center justify-center outline-none cursor-pointer"
            >
              <Bell className="w-5 h-5 stroke-[2]" />
              <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#E8192C] border-2 border-[#F8F9FC] rounded-full" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/profile')} 
              className="w-10 h-10 rounded-full border-2 border-[#E2E8F0] overflow-hidden shadow-sm outline-none cursor-pointer flex items-center justify-center bg-white"
            >
              <User className="w-5 h-5 text-[#64748B]" />
            </motion.button>
          </div>
        </header>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="px-5 flex flex-col w-full relative mt-1 gap-6"
        >
          {/* Balance Card Section */}
          <motion.div variants={childFadeIn} className="w-full">
            <div 
              className="w-full rounded-[24px] p-6 text-white relative overflow-hidden shadow-[0_8px_30px_rgba(232,25,44,0.25)]"
              style={{
                background: isMerchant 
                   ? 'linear-gradient(135deg, #E8192C 0%, #B01221 100%)'
                   : 'linear-gradient(135deg, #E8192C 0%, #FF6B6B 100%)'
              }}
            >
              {/* Subtle Dot Pattern Overlay */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '16px 16px'
                }}
              />
              <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none ${isMerchant ? 'bg-blue-500/20' : 'bg-white/10'}`} />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm font-medium text-white/90">
                  {isMerchant ? "Wallet Balance" : "My Balance"}
                </span>
                <span className="text-sm font-bold font-display italic opacity-90 tracking-tight">Golis Sahal</span>
              </div>
              
              <div className="h-12 flex items-center font-mono relative z-10 w-full justify-between pr-2">
                <AnimatePresence mode="wait">
                  {showBalance ? (
                    <motion.span 
                      key="balance"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      className="text-[40px] font-bold text-white leading-none tracking-tight flex items-end"
                    >
                      ${balance.toFixed(2)}
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="hidden"
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      className="text-[40px] font-bold text-white leading-none tracking-tight flex items-end"
                    >
                      $***.**
                    </motion.span>
                  )}
                </AnimatePresence>
                <div onClick={() => setShowBalance(!showBalance)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer shrink-0">
                  <span className="text-xl">👁️</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div variants={childFadeIn} className="flex justify-between items-center px-2">
            {!isMerchant ? (
              // Customer Layout
              [
                { icon: ScanLine, label: "Scan QR", nav: "/scan" },
                { icon: Send, label: "Send Money", nav: "/send" },
                { icon: QrCode, label: "My QR", nav: "/my-code" },
                { icon: MoreHorizontal, label: "More", nav: "/more" },
              ].map(item => (
                <div key={item.label} onClick={() => navigate(item.nav)} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#E8192C]/10 flex items-center justify-center text-[#E8192C] group-hover:bg-[#E8192C] group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-[22px] h-[22px] stroke-[2]" />
                  </div>
                  <span className="text-[11px] text-[#0F172A] font-semibold tracking-wide text-center leading-tight">
                    {item.label}
                  </span>
                </div>
              ))
            ) : (
              // Merchant Layout
              [
                { icon: QrCode, label: "Merchant QR", nav: "/my-code" },
                { icon: Send, label: "Send Money", nav: "/send" },
                { icon: LifeBuoy, label: "Support", nav: "/merchant-support" },
              ].map(item => (
                <div key={item.label} onClick={() => navigate(item.nav)} className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[52px] h-[52px] rounded-full bg-[#0F172A]/5 flex items-center justify-center text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-[22px] h-[22px] stroke-[2]" />
                  </div>
                  <span className="text-[11px] text-[#0F172A] font-semibold tracking-wide text-center leading-tight">
                    {item.label}
                  </span>
                </div>
              ))
            )}
          </motion.div>

          {/* Business Analytics Mini Card (Merchant Only) */}
          {isMerchant && (
            <motion.div variants={childFadeIn} className="w-full grid grid-cols-2 gap-3 mt-1 cursor-pointer" onClick={() => navigate('/analytics')}>
              <div className="bg-white rounded-[20px] p-4 flex flex-col justify-center border border-[#E2E8F0] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <Store className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase text-[#64748B] tracking-wider mb-1">Today's Sales</span>
                <span className="text-[16px] font-mono font-black text-[#0F172A]">$842.50</span>
              </div>
              <div className="bg-white rounded-[20px] p-4 flex flex-col justify-center border border-[#E2E8F0] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase text-[#64748B] tracking-wider mb-1">Total Customers</span>
                <span className="text-[16px] font-mono font-black text-[#0F172A]">48</span>
              </div>
            </motion.div>
          )}

          {/* Recent Transactions lists */}
          <motion.div variants={childFadeIn} className="flex flex-col mt-2">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-[15px] font-display font-bold text-[#0F172A]">
                 {isMerchant ? "Latest Payments" : "Recent Transactions"}
               </h3>
               <button onClick={() => navigate('/activity')} className="text-[13px] font-semibold text-[#E8192C] cursor-pointer">
                 View all
               </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {(isMerchant ? MERCHANT_TRANSACTIONS : TRANSACTIONS).map((txn, idx) => (
                <motion.div 
                  key={txn.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate('/activity')}
                  className="flex items-center justify-between cursor-pointer group bg-white border border-[#E2E8F0] p-3 rounded-[16px] shadow-sm hover:border-[#CBD5E1]"
                >
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[15px] font-bold text-[#64748B] shrink-0">
                         {txn.initials}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-[14px] font-bold text-[#0F172A]">{txn.name}</p>
                        <p className="text-[12px] text-[#64748B] font-medium mt-0.5">{txn.date}</p>
                      </div>
                   </div>
                   
                   <div className="text-right flex flex-col items-end">
                      <p className={`font-mono text-[15px] font-bold ${(txn as any).type === 'sent' ? 'text-[#0F172A]' : 'text-[#10B981]'}`}>
                        {txn.amount}
                      </p>
                      <div className={`mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981]`}>
                        {txn.status}
                      </div>
                   </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </AppLayout>
  );
}
