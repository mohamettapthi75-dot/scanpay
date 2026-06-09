import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { ArrowLeft, Share2, Download, Printer, Maximize, Utensils, ShoppingBag, Fuel, Pill, ShoppingCart, CarTaxiFront, Code, Hotel, Laptop, Store } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useStore } from "../store";

const CATEGORIES = [
  { id: "restaurant", name: "Restaurant", icon: Utensils },
  { id: "shop", name: "Shop / Retail", icon: ShoppingBag },
  { id: "fuel", name: "Fuel Station", icon: Fuel },
  { id: "pharmacy", name: "Pharmacy", icon: Pill },
  { id: "supermarket", name: "Supermarket", icon: ShoppingCart },
  { id: "taxi", name: "Taxi", icon: CarTaxiFront },
  { id: "freelancer", name: "Freelancer", icon: Code },
  { id: "hotel", name: "Hotel", icon: Hotel },
  { id: "electronics", name: "Electronics", icon: Laptop },
];

export default function MyCode() {
  const navigate = useNavigate();
  const userName = useStore(state => state.userName) || "User";
  const userPhone = useStore(state => state.userPhone) || "753 8881";
  const accountType = useStore(state => state.accountType);
  const merchantCategory = useStore(state => state.merchantCategory);
  const userQrCode = useStore(state => state.userQrCode);

  const isMerchant = accountType === 'merchant';
  const categoryData = CATEGORIES.find(c => c.id === merchantCategory) || { name: 'Business', icon: Store };
  const CategoryIcon = categoryData.icon;
  const categoryName = categoryData.name;
  const titleText = isMerchant ? 'YOUR BUSINESS QR' : 'MY QR CODE';

  const defaultQrVal = `SPAY:${isMerchant ? 'M101' : 'U101'}:${userPhone.replace(/[^0-9]/g, '')}:${userName.trim()}:${isMerchant ? 'MERCHANT' : 'CUSTOMER'}:A1B2C3D4`;
  const finalQrVal = userQrCode || defaultQrVal;

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A] pb-6 flex flex-col max-w-sm mx-auto w-full relative h-[100dvh]">
      {/* Header */}
      <div className="p-6 flex items-center pt-[calc(24px+env(safe-area-inset-top))] mb-2 shrink-0 z-10 w-full relative">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer z-20 absolute left-6">
          <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg text-[#0F172A] z-10 w-full font-display">
          {titleText}
        </h1>
      </div>

      <div className="px-6 flex flex-col items-center flex-1 justify-start pt-6 overflow-y-auto min-h-0 relative pb-10 no-scrollbar">
        <div 
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          className="bg-white p-6 flex flex-col items-center shrink-0 shadow-sm relative z-10 w-full max-w-[290px] transform-gpu border border-[#E2E8F0] rounded-[2rem] animate-scale-up"
        >
          {/* Main profile indicator */}
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="w-14 h-14 rounded-2xl bg-[#E8192C] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-md border border-[#E8192C]/20 -mt-12 mb-4 relative z-20"
          >
            {isMerchant ? <CategoryIcon className="w-6 h-6 text-white stroke-[2.2]" /> : userName.substring(0,2).toUpperCase()}
          </div>
          
          {isMerchant && (
            <div
              style={{ transform: 'translateZ(25px)' }}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#E8192C]/10 border border-[#E8192C]/20 rounded-full mb-3 relative z-20"
            >
              <CategoryIcon className="w-3.5 h-3.5 text-[#E8192C]" />
              <span className="text-[10px] font-bold text-[#E8192C] uppercase tracking-widest">{categoryName}</span>
            </div>
          )}

          <h2 
            style={{ transform: 'translateZ(20px)' }}
            className="text-lg font-bold text-[#0F172A] mb-1 tracking-tight text-center relative z-20 font-display"
          >
            {userName}
          </h2>
          <p 
            style={{ transform: 'translateZ(20px)' }}
            className="text-[#64748B] font-mono font-medium text-sm mb-6 relative z-20"
          >
            +252 {userPhone}
          </p>
          
          {/* Premium QR Container with Glowing Red Corners */}
          <div 
            style={{ transform: 'translateZ(40px)' }}
            className="p-4 border-[1.5px] border-[#E8192C]/20 rounded-2xl mb-6 relative bg-white shadow-sm"
          >
            {/* Corners in red */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-[3px] border-l-[3px] border-[#E8192C] -ml-0.5 -mt-0.5 rounded-tl"/>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-[3px] border-r-[3px] border-[#E8192C] -mr-0.5 -mt-0.5 rounded-tr"/>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[3px] border-l-[3px] border-[#E8192C] -ml-0.5 -mb-0.5 rounded-bl"/>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3px] border-r-[3px] border-[#E8192C] -mr-0.5 -mb-0.5 rounded-br"/>
            
            <div className="p-2.5 rounded-xl flex flex-col items-center">
              <QRCodeSVG 
                value={finalQrVal} 
                size={160}
                level={"M"}
                fgColor="#0F172A"
                bgColor="#FFFFFF"
              />
            </div>
            
            {/* Unique code hash text block */}
            <div className="mt-3 px-3 py-1.5 bg-[#F8F9FC] border border-[#E2E8F0] rounded-xl max-w-[240px] overflow-hidden select-all text-center">
               <span className="font-mono text-[9px] text-[#64748B] font-bold block overflow-x-auto whitespace-nowrap no-scrollbar uppercase tracking-wider">{finalQrVal}</span>
            </div>
          </div>
          
          <p 
            style={{ transform: 'translateZ(10px)' }}
            className="text-[10px] text-[#64748B] uppercase font-bold tracking-widest text-center mt-1"
          >
            {isMerchant ? 'Scan this QR to receive payments' : 'Scan to send me money'}
          </p>
        </div>

        {/* Buttons for premium actions */}
        <div className="w-full grid grid-cols-3 gap-3 mt-8 z-10 shrink-0">
          <button className="flex flex-col items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 border border-[#E2E8F0] rounded-2xl text-[#64748B] hover:text-[#E8192C] transition-all cursor-pointer shadow-sm group">
             <Download className="w-5 h-5 group-hover:text-[#E8192C] transition-colors" />
             <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A]">Save</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 border border-[#E2E8F0] rounded-2xl text-[#64748B] hover:text-[#E8192C] transition-all cursor-pointer shadow-sm group">
             <Share2 className="w-5 h-5 group-hover:text-[#E8192C] transition-colors" />
             <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A]">Share</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 border border-[#E2E8F0] rounded-2xl text-[#64748B] hover:text-[#E8192C] transition-all cursor-pointer shadow-sm group">
             <Printer className="w-5 h-5 group-hover:text-[#E8192C] transition-colors" />
             <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A]">Print</span>
          </button>
        </div>

        {/* Fullscreen view */}
        <button 
          className="flex flex-row items-center justify-center gap-2 py-4 mt-4 w-full shrink-0 rounded-2xl bg-[#0F172A] text-white font-bold cursor-pointer active:scale-[0.98] transition-all shadow-sm"
        >
          <span className="text-sm">Go Fullscreen</span>
          <Maximize className="w-4 h-4 text-white" />
        </button>
      </div>
    </PageWrapper>
  );
}
