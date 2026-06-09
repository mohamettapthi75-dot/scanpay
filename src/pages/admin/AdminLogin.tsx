import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Lock, Mail, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store';

export default function AdminLogin() {
  const navigate = useNavigate();
  const loginAdmin = useStore(state => state.loginAdmin);
  const isAdminAuthenticated = useStore(state => state.isAdminAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isBiometric, setIsBiometric] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email && !isBiometric) return;
    
    setIsAuthenticating(true);
    setErrorMsg(null);
    
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsBiometric(false);
      
      if (email === 'admin@scanpay.so' && password === 'admin123') {
        loginAdmin();
      } else {
        setErrorMsg('ACCESS DENIED: Invalid credentials.');
        setPassword('');
      }
    }, 1500);
  };

  const handleBiometric = () => {
    setEmail('admin@scanpay.so');
    setIsBiometric(true);
    setIsAuthenticating(true);
    setErrorMsg(null);
    
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsBiometric(false);
      loginAdmin();
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-[#060816] text-white flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Left panel - Branding & Aesthetics */}
      <div className="hidden md:flex flex-col w-1/2 bg-[rgba(255,255,255,0.01)] border-r border-[#ffffff0a] relative justify-center p-20 overflow-hidden">
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#00F5FF]/10 to-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded bg-[#00F5FF] flex items-center justify-center text-black font-black text-3xl shadow-[0_0_30px_rgba(0,245,255,0.5)]">
              S
            </div>
            <span className="text-4xl font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-[#94A3B8]">
              ScanPay
            </span>
          </div>
          
          <h1 className="text-5xl font-black leading-tight mb-6 tracking-tight">
            Telecom-Grade <br/>
            <span className="text-[#00F5FF]">Fintech Control</span> <br/>
            Center
          </h1>
          
          <p className="text-[#94A3B8] text-lg leading-relaxed font-semibold">
            Secure admin portal for Golis Sahal integration. Monitor USSD traffic, detect fraud, and manage merchants in real-time. Unauthorized access is strictly prohibited.
          </p>

          <div className="mt-12 flex items-center gap-4 text-sm font-bold text-[#00F5FF]">
            <ShieldCheck className="w-6 h-6" />
            End-to-End Encrypted Session
          </div>
        </div>
      </div>

      {/* Right panel - Login Box */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative">
        {/* Subtle background for mobile */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00F5FF]/5 blur-[100px] rounded-full pointer-events-none md:hidden" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[rgba(255,255,255,0.02)] backdrop-blur-3xl border border-[#ffffff0a] rounded-[2rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B82F6] to-[#00F5FF]" />
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black mb-2 uppercase tracking-wide">Secure Admin Access</h2>
            <p className="text-[#94A3B8] font-semibold text-sm">Enter your credentials to continue</p>
          </div>

          <div className="h-10 mb-4 flex items-center justify-center">
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 px-4 py-2 rounded-xl flex items-center gap-2 text-[#FF4D4D] text-xs font-bold uppercase tracking-widest w-full justify-center"
                >
                  <AlertCircle className="w-4 h-4" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block ml-1">
                Admin Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#00F5FF] transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@scanpay.so" 
                  className="w-full h-14 bg-[#0a0d1d] border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-[#94A3B8]/50 focus:border-[#00F5FF]/50 focus:outline-none transition-all shadow-inner"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest mb-2 block ml-1">
                Master Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#00F5FF] transition-colors" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full h-14 bg-[#0a0d1d] border border-white/10 rounded-2xl pl-12 pr-4 text-white font-mono placeholder:text-[#94A3B8]/50 focus:border-[#00F5FF]/50 focus:outline-none transition-all shadow-inner tracking-widest"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-transparent text-[#00F5FF] focus:ring-[#00F5FF] focus:ring-offset-0 cursor-pointer" />
                <span className="text-xs font-bold text-[#94A3B8] group-hover:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-[#00F5FF] hover:text-white transition-colors">Emergency Reset</a>
            </div>

            <button 
              type="submit"
              disabled={isAuthenticating || !email || !password}
              className="w-full h-14 bg-gradient-to-r from-[#3B82F6] to-[#00F5FF] rounded-2xl font-black uppercase tracking-widest text-[#060816] flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,245,255,0.3)] relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isAuthenticating ? (
                  <motion.div 
                    key="authenticating"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>VERIFYING...</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="login"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>Authenticate</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">OR USE BIOMETRICS</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              type="button"
              onClick={handleBiometric}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors cursor-pointer group ${
                isBiometric ? 'bg-[#00F5FF]/20 text-white shadow-[0_0_30px_rgba(0,245,255,0.5)] border-[#00F5FF]' : 'bg-white/5 border border-white/10 text-[#00F5FF] hover:bg-[#00F5FF]/10'
              }`}
            >
              {isBiometric ? (
                <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-white animate-spin" />
              ) : (
                <Fingerprint className="w-8 h-8 group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
