import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function TopLoadingBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    setVisible(true);
    setProgress(5);
    
    progressTimer = setTimeout(() => {
      setProgress(60);
    }, 100);

    completionTimer = setTimeout(() => {
      setProgress(100);
      
      hideTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setProgress(0);
        }, 200);
      }, 300);
    }, 450);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(completionTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-slate-100/10 dark:bg-black/15">
          {/* Animated Glow "Snake" Loading line */}
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 24,
            }}
            className="h-full relative bg-gradient-to-r from-blue-600 via-[#1e60f2] to-emerald-400"
          >
            {/* The Snake Glowing Head Block */}
            <motion.div 
              animate={{ 
                opacity: [0.6, 1, 0.6], 
                scaleY: [1, 1.25, 1],
                boxShadow: [
                  "0 0 8px rgba(59,130,246,0.5)",
                  "0 0 16px rgba(52,211,153,0.8)",
                  "0 0 8px rgba(59,130,246,0.5)"
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-8 h-full bg-emerald-300 rounded-full"
              style={{
                filter: "blur(1px)",
              }}
            />
            {/* Animated trailing spark effect inside the bar */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)] animate-[shimmer_1.2s_infinite] w-[40px]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
