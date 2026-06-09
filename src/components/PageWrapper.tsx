import React from "react";
import { motion } from "motion/react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.99 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth easeOut expo curve
      }}
      className={`absolute inset-0 w-full h-full text-[#0F172A] flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

