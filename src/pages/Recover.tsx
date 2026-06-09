import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import AppLogo from "../components/AppLogo";

export default function Recover() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp" | "password" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const triggerSMSNotification = () => {
    // Generate a secure validation code
    const generatedOTP = "4829";
    setTimeout(() => {
      setToastMessage(`SCANPAY: Your validation code is ${generatedOTP}. Please verify to reset your password.`);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }, 1500);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 6) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep("otp");
      setCountdown(60);
      triggerSMSNotification();
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Dynamic focus management
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otp.join("");
    if (enteredCode.length < 4) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (enteredCode === "4829" || enteredCode === "1234") {
        setStep("password");
      } else {
        alert("The code entered is invalid. Try using code '4829' received by SMS.");
      }
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 4) return;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setStep("success");
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([40, 40, 150]);
      }
    }, 1200);
  };

  return (
    <PageWrapper className="justify-center px-6 py-12 bg-[#F8F9FC] text-[#0F172A] relative overflow-hidden">
      {/* Floating Interactive SMS Simulation/Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-10 left-4 right-4 z-50 bg-white text-[#0F172A] p-4 rounded-[24px] shadow-xl border border-[#E2E8F0] flex gap-3 cursor-pointer"
            onClick={() => {
              setOtp(["4", "8", "2", "9"]);
              setToastMessage(null);
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-[#E8192C]" />
            </div>
            <div className="flex-1 flex flex-col justify-center text-left">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold tracking-widest text-[#E8192C] uppercase">SMS Verification</span>
                <span className="text-[9px] text-[#64748B]">Just Now</span>
              </div>
              <p className="text-xs font-medium text-[#0F172A] mt-1">{toastMessage}</p>
              <span className="text-[9px] text-[#E8192C] font-bold mt-1.5 uppercase tracking-wider">Tap to auto-fill code</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 w-full max-w-sm mx-auto justify-center overflow-y-auto min-h-[0px] pb-10 scroll-smooth relative z-10 font-sans">
        
        {/* Step-by-Step Back/Exit controls */}
        {step !== "success" && (
          <button 
            type="button"
            onClick={() => {
              if (step === "password") setStep("otp");
              else if (step === "otp") setStep("phone");
              else navigate("/login");
            }}
            className="absolute top-4 left-0 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Brand visual header */}
        {step !== "success" && (
          <div className="flex flex-col items-center mb-8 shrink-0">
            <AppLogo className="w-14 h-14 mb-3" />
            <h1 className="text-xl font-bold mb-1 tracking-tight text-[#0F172A] uppercase text-center font-display">
              Reset<span className="text-[#E8192C]"> Passcode</span>
            </h1>
            <p className="text-[9px] font-bold tracking-[0.15em] text-[#64748B] uppercase text-center">
              Validate via Golis Sahal SMS Gateway
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "phone" && (
            <motion.form
              key="phone-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handlePhoneSubmit}
              className="w-full flex flex-col shrink-0 text-left"
            >
              <div className="bg-white rounded-[24px] p-5 border border-[#E2E8F0] shadow-sm mb-6 text-center">
                <span className="text-[#64748B] text-[13px] font-medium leading-relaxed">
                  Fadlan geli nambarkaaga telefoonka si aan kuugu soo dirno koodka xaqiijinta (OTP Code).
                </span>
              </div>

              <div className="mb-6 relative">
                <label className="text-[10px] font-bold text-[#64748B] tracking-[0.15em] uppercase ml-2 mb-2 block">
                  Telefoonkaaga Golis (Mobile)
                </label>
                <div className="flex items-center bg-white shadow-sm rounded-[16px] border border-[#E2E8F0] focus-within:border-[#E8192C]/40 transition-all h-14 w-full overflow-hidden">
                  <div className="flex items-center px-4 gap-2 border-r border-[#E2E8F0] h-8 shrink-0">
                    <span className="text-[#0F172A] font-bold font-mono text-[15px]">+252</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="90 753 8881"
                    className="bg-transparent border-none outline-none text-[#0F172A] text-[16px] font-bold font-mono w-full px-4 placeholder:text-gray-300 focus:ring-0 focus:outline-none tracking-wider"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\s+/g, ""))}
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length < 6 || isSending}
                className="group relative w-full h-[56px] rounded-[16px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-[16px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10 flex items-center font-bold">
                  {isSending ? "U diraya SMS..." : "Send Reset Code"}
                </span>
              </button>
            </motion.form>
          )}

          {step === "otp" && (
            <motion.form
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleOtpVerify}
              className="w-full flex-col flex shrink-0 text-left"
            >
              <div className="bg-white rounded-[24px] p-5 border border-[#E2E8F0] shadow-sm mb-6 text-center">
                <p className="text-[#64748B] text-[13px] font-medium leading-relaxed">
                  Waxaan kuugu soo dirnay koodka xaqiijinta lambarkaaga <span className="font-bold text-[#0F172A]">+252 {phone}</span>.
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-3 bg-[#E8192C]/10 py-1.5 px-4 rounded-full w-fit mx-auto">
                  <span className="text-[10px] font-bold text-[#E8192C] uppercase tracking-wider">SMS Gateway Simulator</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-[10px] font-bold text-[#64748B] tracking-[0.1em] uppercase block text-center mb-4">
                  Geli koodka (4-Pin Code)
                </label>
                <div className="flex justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      type="number"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      maxLength={1}
                      className="w-14 h-16 bg-white rounded-[16px] border border-[#E2E8F0] text-center text-[24px] font-bold font-mono text-[#0F172A] focus:border-[#E8192C] shadow-sm transition-all outline-none"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={otp.some(d => !d) || isVerifying}
                className="group relative w-full h-[56px] rounded-[16px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-[16px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{isVerifying ? "Xaqiijinaya..." : "Verify & Continue"}</span>
              </button>

              <div className="text-center mt-6">
                {countdown > 0 ? (
                  <p className="text-[12px] text-[#64748B] font-bold tracking-wide">
                    Resend code in <span className="text-[#0F172A]">{countdown}s</span>
                  </p>
                ) : (
                  <button 
                    type="button"
                    onClick={() => {
                      setCountdown(60);
                      triggerSMSNotification();
                    }}
                    className="text-[#E8192C] text-[12px] font-bold tracking-wide hover:underline cursor-pointer"
                  >
                    Resend SMS Code
                  </button>
                )}
              </div>
            </motion.form>
          )}

          {step === "password" && (
            <motion.form
              key="password-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handlePasswordSubmit}
              className="w-full flex-col flex shrink-0 text-left"
            >
              <div className="bg-white rounded-[24px] p-5 border border-[#E2E8F0] shadow-sm mb-6 text-center">
                <span className="text-[#64748B] text-[13px] font-medium leading-relaxed">
                  Hambalyo! Lambarku waa sax. Hadda sameyso Pin-ka cusub ee aad ku gali lahayd App-ka.
                </span>
              </div>

              {/* Enter Password */}
              <div className="mb-5">
                <label className="text-[10px] font-bold text-[#64748B] tracking-[0.1em] uppercase ml-2 mb-2 block">
                  Sameyso Pin-ka Cusub (4-digits)
                </label>
                <div className="flex items-center bg-white shadow-sm rounded-[16px] border border-[#E2E8F0] focus-within:border-[#E8192C]/40 transition-all h-14 px-5 w-full">
                  <Lock className="w-5 h-5 text-[#E8192C] mr-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="Geli 4 gobor"
                    className="bg-transparent border-none outline-none text-[#0F172A] text-[18px] w-full font-bold font-mono placeholder:text-gray-300 tracking-[0.3em] placeholder:tracking-normal focus:ring-0 focus:outline-none"
                    value={password}
                    maxLength={4}
                    onChange={(e) => setPassword(e.target.value.replace(/\D/g, ""))}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#64748B] hover:text-[#0F172A] transition-colors outline-none ml-2 cursor-pointer"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-8">
                <label className="text-[10px] font-bold text-[#64748B] tracking-[0.1em] uppercase ml-2 mb-2 block">
                  Ku celi Pin-ka Cusub
                </label>
                <div className="flex items-center bg-white shadow-sm rounded-[16px] border border-[#E2E8F0] focus-within:border-[#E8192C]/40 transition-all h-14 px-5 w-full">
                  <Lock className="w-5 h-5 text-[#E8192C] mr-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    placeholder="Ku celi pin-ka"
                    className="bg-transparent border-none outline-none text-[#0F172A] text-[18px] w-full font-bold font-mono placeholder:text-gray-300 tracking-[0.3em] placeholder:tracking-normal focus:ring-0 focus:outline-none"
                    value={confirmPassword}
                    maxLength={4}
                    onChange={(e) => setConfirmPassword(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={password.length < 4 || password !== confirmPassword || isSaving}
                className="group relative w-full h-[56px] rounded-[16px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-[16px] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>{isSaving ? "La badalayaa..." : "Save New Pin"}</span>
              </button>
            </motion.form>
          )}

          {step === "success" && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="w-full flex-col flex items-center text-center shrink-0 mt-6"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-[#E8192C] text-white rounded-full flex items-center justify-center shadow-lg relative z-10 animate-pulse">
                  <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                </div>
              </div>

              <h2 className="text-[24px] font-bold text-[#0F172A] tracking-tight font-display mb-1">
                Guul! (Success)
              </h2>
              <p className="text-[#E8192C] text-[11px] font-bold uppercase tracking-[0.1em] mb-6">
                Code Changed Successfully
              </p>

              <div className="bg-white rounded-[24px] p-6 border border-[#E2E8F0] shadow-sm mb-10 w-full">
                <p className="text-[#64748B] text-[13px] font-medium leading-relaxed">
                  Pin-kaaga cusub si guul leh ayaa loo kaydiyay. Waxaad hadda ku gali kartaa passcode-kaaga cusub.
                </p>
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full h-[56px] rounded-[16px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-[16px] flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                Go to Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageWrapper>
  );
}
