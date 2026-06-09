import React from 'react';

export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#FFFFFF]/80 dark:bg-slate-800 rounded-md ${className}`} />
  );
}
