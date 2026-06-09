import React from 'react';
import BottomNav from "./BottomNav";

export default function AppLayout({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className="flex h-[100dvh] w-full bg-[#F8F9FC] relative overflow-hidden text-[#0F172A]">
      <main className={`flex-1 flex flex-col relative overflow-hidden z-10 w-full ${className}`}>
        {children}
        <BottomNav />
      </main>
    </div>
  );
}
