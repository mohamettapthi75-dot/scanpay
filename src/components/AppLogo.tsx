import React from 'react';

interface AppLogoProps {
  className?: string;
  variant?: "icon" | "full";
  showSubtitle?: boolean;
}

export default function AppLogo({ 
  className = "w-12 h-12", 
  variant = "icon",
  showSubtitle = true 
}: AppLogoProps) {
  
  const logoSVG = (
    <svg 
      className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.35)] animate-pulse" 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Neon green gradient for scan lines and primary elements */}
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF87" />
          <stop offset="100%" stopColor="#60EFFF" />
        </linearGradient>

        {/* Premium metallic card gradient */}
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E1A16" />
          <stop offset="100%" stopColor="#050807" />
        </linearGradient>

        {/* Intense Outer Glow filters */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer revolving tracking ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="52" 
        fill="transparent"
        stroke="url(#greenGrad)" 
        strokeWidth="1.5" 
        strokeDasharray="40 140 30 50"
        opacity="0.3"
      />

      {/* Dotted target guide */}
      <circle 
        cx="60" 
        cy="60" 
        r="44" 
        fill="transparent"
        stroke="rgba(16, 185, 129, 0.15)" 
        strokeWidth="1" 
        strokeDasharray="3 6"
      />

      {/* Scanning corners (Neon green targets) */}
      <path d="M 34 38 L 34 30 L 42 30" stroke="#10B981" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />
      <path d="M 86 38 L 86 30 L 78 30" stroke="#10B981" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />
      <path d="M 34 82 L 34 90 L 42 90" stroke="#10B981" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />
      <path d="M 86 82 L 86 90 L 78 90" stroke="#10B981" strokeWidth="3" strokeLinecap="round" filter="url(#neonGlow)" />

      {/* Dynamic scan line sweep */}
      <line x1="28" y1="60" x2="92" y2="60" stroke="#10B981" strokeWidth="2.5" filter="url(#neonGlow)" opacity="0.8" />
      
      {/* Central "$" symbol enclosing circular curves representing transfer */}
      <g transform="translate(60, 60) scale(1.15) translate(-15, -15)">
        {/* Glowing Dollar Core */}
        <text 
          x="15" 
          y="22" 
          fill="url(#greenGrad)" 
          fontSize="24" 
          fontWeight="900" 
          fontFamily="system-ui, sans-serif" 
          textAnchor="middle" 
          filter="url(#neonGlow)"
        >
          $
        </text>
        
        {/* Top-right loop arrow */}
        <path 
          d="M 24 5 A 11 11 0 0 1 27 15" 
          stroke="#10B981" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path d="M 27 15 L 24 13 M 27 15 L 29 11" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />

        {/* Bottom-left loop arrow */}
        <path 
          d="M 6 25 A 11 11 0 0 1 3 15" 
          stroke="#10B981" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path d="M 3 15 L 6 17 M 3 15 L 1 19" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );

  if (variant === "icon") {
    return (
      <div className={`${className} flex items-center justify-center shrink-0`}>
        {logoSVG}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center select-none">
      {/* Premium Glassmorphism Container with deep dark glow */}
      <div className="w-36 h-36 md:w-40 md:h-40 rounded-[2.2rem] p-4 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-radial-gradient from-[#10B981]/10 to-transparent pointer-events-none opacity-40 blur-xl" />
        <div className="absolute inset-y-0 w-2 bg-gradient-to-r from-transparent via-[#10B981]/15 to-transparent skew-x-12 pointer-events-none" />
        <div className="w-full h-full relative z-10">
          {logoSVG}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-[0.24em] flex items-center justify-center uppercase font-display">
          <span className="text-white">SCAN</span>
          <span className="text-[#10B981] ml-1">PAY</span>
        </h1>
        
        {showSubtitle && (
          <p className="text-[10px] font-bold tracking-[0.38em] text-emerald-500/60 uppercase flex items-center justify-center">
            Pay instantly with Golis Sahal
          </p>
        )}
      </div>
    </div>
  );
}
