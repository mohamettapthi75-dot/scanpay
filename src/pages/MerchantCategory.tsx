import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { Utensils, ShoppingBag, Fuel, Pill, ShoppingCart, CarTaxiFront, Code, Hotel, Laptop, ArrowLeft } from "lucide-react";
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

export default function MerchantCategory() {
  const navigate = useNavigate();
  const setMerchantCategory = useStore(state => state.setMerchantCategory);

  const handleSelect = (categoryId: string) => {
    setMerchantCategory(categoryId);
    navigate('/home');
  };

  return (
    <PageWrapper className="bg-[#F8F9FC] text-[#0F172A] flex flex-col h-full w-full relative overflow-y-auto no-scrollbar">
      
      <div className="flex-1 overflow-y-auto min-h-[0px] px-5 py-8 pb-12 w-full flex flex-col relative z-10 pt-[calc(20px+env(safe-area-inset-top))]">
        <div className="w-full max-w-xl mx-auto flex flex-col h-full font-sans">
          
          {/* Header */}
          <header className="flex flex-col relative z-10 w-full mb-8 shrink-0 text-left">
            <div className="flex items-center justify-between w-full mb-6">
              <button 
                onClick={() => navigate('/account-type')} 
                className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 transition-all active:scale-95 outline-none cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            
            {/* Title with premium glowing typography */}
            <h1 className="text-[28px] font-black text-[#0F172A] tracking-tight leading-none mb-2 font-display">Business<br/> <span className="text-[#E8192C]">Category</span></h1>
            <p className="text-[13px] text-[#64748B] font-medium leading-relaxed">Select the industry that best describes your business.</p>
          </header>

          <div className="flex-1 overflow-y-auto block pb-8 no-scrollbar">
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
               {CATEGORIES.map((cat) => (
                 <button 
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-[#E2E8F0] rounded-[24px] hover:border-[#E8192C]/30 hover:bg-[#F8F9FC] active:scale-[0.96] transition-all group shadow-sm cursor-pointer"
                 >
                    <div className="w-12 h-12 rounded-full bg-[#F8F9FC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] group-hover:border-[#E8192C]/35 group-hover:bg-[#E8192C]/10 group-hover:text-[#E8192C] transition-colors">
                       <cat.icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[12px] font-bold text-[#0F172A] tracking-wide group-hover:text-[#E8192C] transition-colors">{cat.name}</span>
                 </button>
               ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
