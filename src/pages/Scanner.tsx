import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { ArrowLeft, Image as ImageIcon, Zap, QrCode, Scan, AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { useStore, isGolisSahalNumber } from "../store";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

export default function Scanner() {
  const navigate = useNavigate();
  const userName = useStore(state => state.userName) || "User name";
  const userPhone = useStore(state => state.userPhone) || "7538881";
  const accountType = useStore(state => state.accountType) || "customer";
  const userId = useStore(state => state.userId) || "U101";

  const [flashOn, setFlashOn] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scanningStatus, setScanningStatus] = useState("Align QR to scan...");
  const [countDown, setCountDown] = useState(3);
  const [showManual, setShowManual] = useState(false);

  const processQR = (qrString: string) => {
    const rawStr = qrString.trim();
    
    if (!rawStr.startsWith("SPAY:")) {
      setErrorMsg("⚠ Invalid ScanPay QR");
      setScanningStatus("Validation Failed");
      toast.error("Invalid ScanPay QR format detected. Blocked.");
      return false;
    }

    const parts = rawStr.split(":");
    if (parts.length < 6) {
      setErrorMsg("⚠ Invalid ScanPay QR");
      setScanningStatus("Structure Error");
      toast.error("Invalid structural details inside code.");
      return false;
    }

    const [_, id, phone, name, type, hash] = parts;

    if (!isGolisSahalNumber(phone)) {
      setErrorMsg("⚠ Unsupported Network");
      setScanningStatus("Unsupported Network");
      toast.error("Unsupported network number detected! Accepts Golis Sahal numbers only.");
      return false;
    }

    setErrorMsg(null);
    setScanningStatus("Code verified successfully!");
    toast.success(`Verified: ${name}`);

    setTimeout(() => {
      navigate(`/pay/${id}`, {
        state: { scannedId: id, scannedPhone: phone, scannedName: name, scannedType: type, scannedHash: hash }
      });
    }, 600);

    return true;
  };

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countDown === 0) {
      const defaultSahalMerchantQR = "SPAY:M001:7538881:Ali Shop:MERCHANT:A1B2C3D4";
      setScanningStatus("Auto-scanning simulated code...");
      processQR(defaultSahalMerchantQR);
    }
  }, [countDown]);

  return (
    <PageWrapper className="bg-black text-white flex flex-col h-full w-full relative overflow-hidden">
      {/* Full Bleed "Camera Viewfinder" Background Simulation */}
      <div className="absolute inset-0 bg-[#161616]">
        {/* Subtle noise/gradient to simulate light entering lens */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/40 to-black/90 mix-blend-overlay" />
      </div>

      {/* Header Utilities */}
      <div className="w-full pt-[calc(20px+env(safe-area-inset-top))] px-6 pb-4 flex justify-between items-center bg-transparent relative z-20">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors active:scale-95 cursor-pointer border border-white/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-[14px] font-bold tracking-widest uppercase text-white font-display drop-shadow-md">SCAN QR</span>
        
        <button 
          onClick={() => setFlashOn(!flashOn)}
          className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-colors active:scale-95 cursor-pointer border border-white/10 ${flashOn ? 'bg-white text-black' : 'bg-black/40 text-white hover:bg-black/60'}`}
        >
          <Zap className={`w-5 h-5 ${flashOn ? 'fill-black' : ''}`} />
        </button>
      </div>

      {/* Target Reticle Viewport */}
      <div className="flex-1 w-full flex items-center justify-center relative z-10 px-8">
        
        <div className="relative w-full max-w-[280px] aspect-square">
           {/* 4 Corner brackets representing precision reticle */}
           <div className="absolute top-0 left-0 w-12 h-12 border-t-[4px] border-l-[4px] border-[#E8192C] rounded-tl-[24px]" />
           <div className="absolute top-0 right-0 w-12 h-12 border-t-[4px] border-r-[4px] border-[#E8192C] rounded-tr-[24px]" />
           <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[4px] border-l-[4px] border-[#E8192C] rounded-bl-[24px]" />
           <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[4px] border-r-[4px] border-[#E8192C] rounded-br-[24px]" />

           {/* Scanning Laser Line */}
           <div className="absolute left-2 right-2 h-[2px] bg-[#E8192C] shadow-[0_0_15px_#E8192C]"
                style={{ animation: "scannerLine 2.5s infinite ease-in-out" }} />

           <div className="absolute inset-0 flex flex-col items-center justify-center">
             {countDown > 0 ? (
               <div className="text-center drop-shadow-lg p-2 rounded-lg bg-black/20 backdrop-blur-sm">
                 <p className="text-[12px] uppercase font-bold tracking-widest text-white/80">Scanning target...</p>
                 <p className="text-4xl font-black font-mono text-white mt-1">{countDown}</p>
               </div>
             ) : (
               <div className="p-4 rounded-full bg-black/40 backdrop-blur-md">
                 <ShieldCheck className="w-10 h-10 text-[#E8192C] animate-pulse stroke-[2]" />
               </div>
             )}
           </div>
        </div>

      </div>

      {errorMsg && (
        <div className="absolute top-[120px] left-6 right-6 bg-red-500 text-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg z-30 animate-pulse">
           <AlertTriangle className="w-5 h-5 flex-shrink-0" />
           <span className="text-[13px] font-bold">{errorMsg}</span>
        </div>
      )}

      {/* Active merchant context overlay at bottom */}
      <div className="relative z-20 w-full mt-auto pt-10 px-6 pb-12 overflow-hidden">
        {/* Background gradient fade-up for bottom elements */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
        
        <div className="relative flex justify-center mb-8 gap-6">
           <button className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-active:scale-95 transition-all">
                <ImageIcon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">Gallery</span>
           </button>
           <button onClick={() => setShowManual(!showManual)} className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-active:scale-95 transition-all">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">My Code</span>
           </button>
        </div>

        <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-xl relative w-full">
           <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-slate-100">
             <img src="https://api.dicebear.com/7.x/notionists/svg?seed=merch1" alt="Merchant" className="w-full h-full object-cover bg-gray-100" />
           </div>
           <div className="flex-1">
              <p className="text-[11px] uppercase tracking-widest text-[#64748B] font-bold mb-0.5">Detecting Nearby</p>
              <h3 className="text-[15px] font-bold text-[#0F172A] leading-tight">Ali Shop Point</h3>
              <p className="text-[12px] font-medium text-[#64748B] font-mono mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis mr-2">Waiting for scan alignment...</p>
           </div>
        </div>
      </div>

    </PageWrapper>
  );
}
