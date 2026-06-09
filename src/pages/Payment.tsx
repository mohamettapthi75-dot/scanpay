import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { ArrowLeft, Store, User, ShieldCheck, PhoneCall, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import toast from "react-hot-toast";

export default function Payment() {
  const navigate = useNavigate();
  const { merchantId } = useParams();
  const location = useLocation();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUssdModal, setShowUssdModal] = useState(false);
  const [ussdStep, setUssdStep] = useState(1); // 1: Dialer Handshake, 2: Sahal PIN Screen
  const [pinValue, setPinValue] = useState("");
  const [showPin, setShowPin] = useState(false);

  const { scannedId, scannedPhone, scannedName, scannedType, scannedHash } = location.state || {};

  const isMerchant = scannedType === "MERCHANT" || merchantId?.toLowerCase() === "ali-shop" || merchantId?.toLowerCase().includes("shop") || false;
  const displayName = scannedName || (isMerchant ? "Ali Shop" : merchantId || "Unknown Recipient");
  const cleanScannedPhone = scannedPhone ? scannedPhone.replace(/[^0-9]/g, '') : "7538881";
  const displayPhone = `+252 ${cleanScannedPhone}`;
  const hasSecureChecksum = !!scannedHash;

  // Golis Sahal Formula Builder with STRICT VALIDATION RULE: *883*PHONE*AMOUNT#
  const buildUSSD = (phone: string, amt: string) => {
    const formattedAmt = amt || "0";
    const ussd = `*883*${phone}*${formattedAmt}#`;

    const starCount = (ussd.match(/\*/g) || []).length;
    const hasCorrectPrefix = ussd.startsWith("*883*");
    const hasCorrectSuffix = ussd.endsWith("#");

    if (starCount !== 3 || !hasCorrectPrefix || !hasCorrectSuffix || !phone || !formattedAmt) {
      throw new Error(`CRITICAL INVALID USSD: Compiled string [${ussd}] violated safety constraints.`);
    }

    return ussd;
  };

  let generatedUssd = "";
  try {
    generatedUssd = buildUSSD(cleanScannedPhone, amount);
  } catch (error) {
    generatedUssd = `*883*${cleanScannedPhone}*0#`;
  }

  const handlePay = () => {
    if (!amount || Number(amount) <= 0) return;
    setLoading(true);
    
    // Simulate SIM dialer handshake
    setTimeout(() => {
      setLoading(false);
      setShowUssdModal(true);
      setUssdStep(1);
      setPinValue("");
      
      // Auto advance to PIN input screen in 1.4 seconds
      setTimeout(() => {
        setUssdStep(2);
      }, 1400);
    }, 800);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinValue.length < 4) {
      toast.error("Please enter your 4-digit PIN");
      return;
    }
    
    setUssdStep(3); // cellular transmitting
    toast.success("PIN Received. Processing secure Cellular Handshake...");
    
    setTimeout(() => {
      setShowUssdModal(false);
      navigate("/success", { state: { name: displayName, amount: amount } });
    }, 1600);
  };

  const addNumber = (num: string) => {
    if (amount.includes(".") && num === ".") return;
    if (amount.split(".")[1]?.length >= 2) return;
    setAmount((prev) => prev + num);
  };

  const removeNumber = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A] flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">

      <div className="flex-1 flex flex-col justify-between w-full mx-auto h-full min-h-[0px] relative z-10">
        <div className="flex-grow flex flex-col">
          {/* Header */}
          <div className="pt-[calc(20px+env(safe-area-inset-top))] px-5 pb-4 flex items-center mb-2">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E2E8F0] shadow-sm text-[#0F172A] hover:bg-gray-50 transition-colors active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="flex-1 text-center font-bold text-[16px] text-[#0F172A] mr-10 font-display">Confirm Payment</h1>
          </div>

          <div className="px-5 flex flex-col pt-2 justify-center">
            {/* Recipient Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 flex flex-col shadow-sm mb-6 relative">
              <div className="flex items-center gap-2 mb-4 text-[#E8192C]">
                {isMerchant ? <Store className="w-4 h-4" /> : <User className="w-4 h-4" />}
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#E8192C]">
                  {isMerchant ? 'Golis Merchant Identified' : 'Recipient Found'}
                </h2>
              </div>
              
              <div className="flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100 bg-[#F8F9FC] flex items-center justify-center">
                     <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${displayName}`} alt="Merchant" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">{displayName}</h3>
                    <p className="text-[12px] text-[#64748B] font-mono mt-0.5">{displayPhone}</p>
                  </div>
                </div>
              </div>

              {/* Secure QR Code validation banner */}
              {hasSecureChecksum && (
                <div className="mt-4 flex items-center justify-between px-3 py-2.5 bg-[#F8F9FC] border border-[#E2E8F0] rounded-[14px] text-[10px] font-mono text-[#0F172A] uppercase font-bold tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#0F172A]">
                     <ShieldCheck className="w-4 h-4 text-[#E8192C] shrink-0 fill-[#E8192C]/10" />
                     Secure Verified
                  </span>
                  <span className="text-[#64748B] font-black">{scannedHash}</span>
                </div>
              )}
            </div>

            {/* Amount Display */}
            <div className="mb-6 flex flex-col items-center">
              <label className="text-[12px] font-bold text-[#64748B] uppercase mb-4 text-center tracking-widest">Enter Amount</label>
              <div className="flex items-center gap-1.5 mb-2 h-[60px]">
                <span className="text-[28px] text-[#0F172A] font-medium font-mono border-b-2 border-transparent focus-within:border-[#E8192C] transition-colors">$</span>
                <span className={`text-[52px] font-mono tracking-tighter leading-none ${amount.length === 0 ? 'text-[#CBD5E1]' : 'text-[#0F172A] font-black'}`}>
                  {amount || "0.00"}
                </span>
              </div>
              
              {amount && (
                <AnimatePresence>
                  <motion.div 
                    initial={{opacity:0, y:-10}}
                    animate={{opacity:1, y:0}}
                    className="w-full mt-6 bg-white border border-[#E2E8F0] rounded-[20px] p-4 flex flex-col shadow-sm gap-2"
                  >
                    <div className="flex justify-between items-center bg-[#F8F9FC] p-3 rounded-[12px]">
                       <span className="text-[12px] text-[#64748B] font-bold">From Balance</span>
                       <span className="text-[13px] text-[#0F172A] font-bold font-mono">$542.40</span>
                    </div>

                    <div className="pt-2 border-t border-[#F1F5F9] mt-1 space-y-1.5">
                      <p className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider px-1">
                        Network USSD Code:
                      </p>
                      <p className="font-mono text-[13px] font-bold text-[#0F172A] bg-[#F8F9FC] border border-[#E2E8F0] px-3 py-2 rounded-[12px] break-all select-all flex items-center justify-between">
                        <span>{generatedUssd}</span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>

        {/* Numerical keyboard */}
        <div className="px-5 pb-6 shrink-0 bg-[#F8F9FC] pt-2">
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 mb-4 shadow-sm">
            <div className="grid grid-cols-3 gap-y-4 gap-x-4 max-w-sm mx-auto">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((num) => (
                <button 
                  key={num} 
                  onClick={() => addNumber(num)}
                  className="h-14 rounded-[16px] bg-[#F8F9FC] hover:bg-[#F1F5F9] active:scale-[0.96] flex items-center justify-center font-mono font-bold text-[22px] text-[#0F172A] transition-all cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button 
                onClick={removeNumber}
                className="h-14 rounded-[16px] bg-[#F8F9FC] hover:bg-[#FEF2F2] hover:text-[#EF4444] active:scale-[0.96] flex items-center justify-center font-bold text-[#64748B] transition-all uppercase text-[12px] tracking-wider cursor-pointer"
              >
                DEL
              </button>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={!amount || Number(amount) <= 0 || loading}
            className="w-full h-[56px] bg-[#E8192C] text-white font-bold text-[16px] rounded-[16px] shadow-[0_4px_20px_rgba(232,25,44,0.35)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center active:scale-[0.97] transition-all cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-[14px]">CONNECTING...</span>
              </div>
            ) : (
              "Confirm & Pay"
            )}
          </button>
        </div>
      </div>

      {/* MODAL: Highly Immersive Dialer & Golis Sahal PIN Handoff Simulation */}
      <AnimatePresence>
        {showUssdModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-5"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-[28px] w-full max-w-[340px] p-6 shadow-2xl relative overflow-hidden"
            >
              {/* STEP 1: Phone call dialer background */}
              {ussdStep === 1 && (
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 bg-[#F8F9FC] rounded-full flex items-center justify-center mx-auto border border-[#E2E8F0] shadow-sm">
                    <PhoneCall className="w-6 h-6 text-[#E8192C] animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-mono text-[#0F172A] font-bold text-[18px] tracking-wider block">{generatedUssd}</h3>
                    <p className="text-[13px] text-[#64748B] font-bold mt-2">Calling network service...</p>
                  </div>
                  <div className="bg-[#FEF2F2] p-3 rounded-[12px] flex flex-col gap-2">
                     <span className="font-bold text-[11px] uppercase text-[#E8192C]">Secure Line Protocol</span>
                     <p className="text-[10px] text-[#64748B] font-medium leading-tight">Payment is routed directly to Golis Telecom Sahal Network.</p>
                  </div>
                </div>
              )}

              {/* STEP 2: SIM Golis Sahal popup Dialog form */}
              {ussdStep === 2 && (
                <form onSubmit={handlePinSubmit} className="space-y-5">
                  <div className="bg-[#F8F9FC] border border-[#E2E8F0] p-4 rounded-[20px]">
                    <div className="flex items-center gap-2 mb-3 text-[#0F172A]">
                      <AlertCircle className="w-4 h-4 text-[#E8192C]" />
                      <span className="text-[12px] font-bold uppercase tracking-wider font-display">Sahal Service</span>
                    </div>
                    <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">
                      Ma rabtaa inaad u wareejiso <strong className="font-bold font-mono">${amount}</strong> taleefanka <strong className="font-bold font-mono">{displayPhone}</strong> ({displayName})?
                    </p>
                    <p className="text-[12px] text-[#64748B] font-bold mt-4 mb-2">
                      Geli PIN-ka Sahal:
                    </p>
                    
                    <div className="relative">
                      <input 
                        type={showPin ? "text" : "password"}
                        maxLength={4}
                        placeholder="••••"
                        autoFocus
                        value={pinValue}
                        onChange={(e) => setPinValue(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#E8192C] rounded-[16px] py-4 px-4 font-mono text-center text-2xl text-[#0F172A] font-bold outline-none tracking-[0.3em] placeholder:tracking-normal placeholder:text-gray-300 transition-colors shadow-inner"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A]"
                      >
                        {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#64748B] text-center block leading-relaxed font-medium px-2">
                    Executed inside your local SIM interface. ScanPay cannot read your wallet PIN.
                  </span>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => {
                        setShowUssdModal(false);
                        toast.error("Transaction Cancelled");
                      }}
                      className="h-[48px] bg-white border border-[#E2E8F0] hover:bg-gray-50 rounded-[14px] text-[13px] text-[#64748B] font-bold transition-colors cursor-pointer"
                    >
                      Baji (Cancel)
                    </button>
                    <button 
                      type="submit"
                      disabled={pinValue.length < 4}
                      className="h-[48px] bg-[#0F172A] disabled:opacity-50 rounded-[14px] text-[13px] text-white font-bold transition-all shadow-md cursor-pointer"
                    >
                      Haa (Confirm)
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Transmitting simulation */}
              {ussdStep === 3 && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 border-[4px] border-[#E8192C]/20 border-t-[#E8192C] rounded-full animate-spin mx-auto" />
                  <div>
                    <h3 className="font-bold text-[15px] text-[#0F172A]">Processing Payment</h3>
                    <p className="text-[12px] text-[#64748B] font-medium mt-1">Simulating cellular exchange...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
