import React from "react";

const Screen = ({ title, path, scale = 0.8 }: { title: string, path: string, scale?: number }) => (
  <div className="flex flex-col items-center gap-6 group">
    <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em]">{title}</h3>
    
    <div 
      className="relative bg-black rounded-[48px] p-2 shadow-2xl transition-transform duration-500 group-hover:-translate-y-4"
      style={{
        width: 375, 
        height: 812,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)"
      }}
    >
      {/* Hardware Buttons */}
      <div className="absolute top-[120px] -left-1 w-1 h-[32px] bg-slate-800 rounded-l-md"></div>
      <div className="absolute top-[170px] -left-1 w-1 h-[60px] bg-slate-800 rounded-l-md"></div>
      <div className="absolute top-[240px] -left-1 w-1 h-[60px] bg-slate-800 rounded-l-md"></div>
      <div className="absolute top-[190px] -right-1 w-1 h-[90px] bg-slate-800 rounded-r-md"></div>

      {/* Screen Container */}
      <div className="w-full h-full bg-white rounded-[40px] overflow-hidden relative border-[6px] border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[24px] z-50 flex items-center justify-center p-2">
           <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
           <div className="w-3 h-3 bg-slate-800 rounded-full absolute right-3"></div>
        </div>
        
        {/* Iframe for the specific route */}
        <iframe 
          src={path} 
          title={title}
          className="w-full h-full border-none pointer-events-none" 
        />
      </div>
    </div>
  </div>
);

export default function Showcase() {
  return (
    <div className="min-h-[100dvh] bg-[#F1F5F9] font-sans selection:bg-[#E8192C]/20 text-slate-900 overflow-x-hidden">
      {/* Header Splash */}
      <div className="w-full bg-white border-b border-slate-200 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E8192C]/10 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-[1800px] mx-auto px-12 relative z-10 text-center">
           <div className="inline-flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-[#E8192C] animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">High-Fidelity Prototype</span>
           </div>
           
           <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight font-display">
             ScanPay UI/UX Showcase
           </h1>
           <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-4xl mx-auto leading-relaxed">
             A unified presentation flow of the complete fintech mobile application layout. Clean white motif with bold #E8192C utility accents. Note: Merchant Suite is a conceptual extension utilizing identical components.
           </p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-12 py-32 space-y-40">
        
        {/* TIER 1 */}
        <section>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-1 bg-[#E8192C]"></span>
              1. Global Onboarding
            </h2>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="flex flex-wrap gap-x-20 gap-y-24 justify-center">
             <Screen title="Splash / Welcome" path="/welcome" />
             <Screen title="Choose Account" path="/account-type" />
             <Screen title="Create Account" path="/register" />
             <Screen title="Login" path="/login" />
          </div>
        </section>

        {/* TIER 2 */}
        <section>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-1 bg-[#E8192C]"></span>
              2. Customer Suite
            </h2>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="flex flex-wrap gap-x-20 gap-y-24 justify-center">
             <Screen title="Home Dashboard" path="/home" />
             <Screen title="Scan QR" path="/scan" />
             <Screen title="Send Money" path="/send" />
             <Screen title="Activity History" path="/activity" />
          </div>
        </section>

        {/* TIER 3 */}
        <section>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest flex items-center gap-4">
              <span className="w-12 h-1 bg-[#E8192C]"></span>
              3. Structural Utilities
            </h2>
            <div className="h-[1px] flex-1 bg-slate-200"></div>
          </div>
          
          <div className="flex flex-wrap gap-x-20 gap-y-24 justify-center">
             <Screen title="QR Generation" path="/my-code" />
             <Screen title="Profile & Settings" path="/profile" />
             {/* We can duplicate some to show layout flexibility */}
             <Screen title="System Loading" path="/success" /> 
             <Screen title="Account Recovery" path="/recover" />
          </div>
        </section>

      </div>
      
      <div className="w-full bg-slate-900 py-12 text-center text-slate-400">
         <p className="font-mono text-sm tracking-widest uppercase">ScanPay Prototype End</p>
      </div>
    </div>
  )
}
