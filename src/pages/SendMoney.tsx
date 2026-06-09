import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Search, User, ChevronRight, CheckCircle2, 
  ShieldCheck, Fingerprint, Share2, Download, 
  CreditCard, QrCode, Phone, Plus, Star, X, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Step = 'recipient' | 'amount' | 'review' | 'security' | 'success';
type Currency = 'USD' | 'SOS';
type PaymentMethod = 'MOBILE_MONEY' | 'QR_TRANSFER' | 'BANK_TRANSFER';

interface Recipient {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  initials: string;
  color: string;
  isFavorite?: boolean;
}

const RECENT_RECIPIENTS: Recipient[] = [
  { id: '1', name: 'Ahmed Hassan', phone: '0907123001', initials: 'AH', color: 'bg-blue-100 text-blue-700', isFavorite: true },
  { id: '2', name: 'Maryan Ali', phone: '0907123002', initials: 'MA', color: 'bg-emerald-100 text-emerald-700' },
  { id: '3', name: 'Abdul Rahman', phone: '0907123003', initials: 'AR', color: 'bg-amber-100 text-amber-700', isFavorite: true },
];

export default function SendMoney() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<Step>('recipient');
  
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [phoneSearch, setPhoneSearch] = useState('');
  
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('MOBILE_MONEY');
  
  const [pin, setPin] = useState('');
  const [isBiometric, setIsBiometric] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {}, []);

  const handleSelectRecipient = (rec: Recipient) => {
    setSelectedRecipient(rec);
    setStep('amount');
  };

  const handleAmountNext = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('review');
  };

  const handleReviewConfirm = () => {
    setStep('security');
  };

  const processPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      processPayment();
    }
  };

  const handleBiometricAuth = () => {
    setIsBiometric(true);
    processPayment();
  };

  const renderRecipientStep = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col pt-6 pb-20 overflow-y-auto px-6 no-scrollbar"
    >
      <p className="text-[13px] text-gray-500 font-bold mb-2">Enter Phone Number</p>
      <div className="relative mb-8">
        <input 
          type="text"
          placeholder="0907123456"
          value={phoneSearch}
          onChange={(e) => setPhoneSearch(e.target.value)}
          className="w-full bg-white border-2 border-gray-100 text-[#0F172A] rounded-[12px] pl-4 pr-12 py-3.5 focus:outline-none focus:border-[#E8192C] font-bold tracking-widest placeholder-gray-300 font-mono text-lg"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E8192C]">
          <User className="w-5 h-5 flex-shrink-0" />
        </button>
      </div>

      <div className="flex-1">
        <h3 className="text-[13px] font-bold text-[#64748B] mb-4 px-1">Recent Contacts</h3>
        <div className="space-y-3">
          {RECENT_RECIPIENTS.map(rec => (
            <button 
              key={`recent-${rec.id}`}
              onClick={() => handleSelectRecipient(rec)}
              className="w-full bg-transparent p-2 flex items-center gap-4 hover:bg-gray-50 rounded-xl transition-colors active:scale-95"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${rec.name}`} alt={rec.name} className="w-full h-full object-cover bg-gray-100" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-[13px] font-bold text-[#0F172A]">{rec.name}</h4>
                <p className="text-[11px] font-medium text-[#64748B] mt-0.5 font-mono">{rec.phone}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <button
        disabled={phoneSearch.length < 5}
        onClick={() => {
           setSelectedRecipient({ id: '99', name: 'Unknown User', phone: phoneSearch, initials: 'U', color: 'bg-gray-200 text-gray-700' });
           setStep('amount');
        }}
        className="w-full h-[56px] rounded-[14px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-lg flex items-center justify-center transition-all active:scale-[0.97] disabled:opacity-50 mt-auto cursor-pointer"
      >
        Next
      </button>
    </motion.div>
  );

  const renderAmountStep = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col pt-2 pb-6 px-6 overflow-y-auto no-scrollbar"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-[13px] font-bold text-[#64748B] mb-2">Amount</p>
        <div className="flex items-center text-[44px] font-extrabold font-mono text-[#0F172A] mb-8 border-b-2 border-transparent focus-within:border-[#E8192C] transition-colors pb-1 justify-center w-full">
          <span className="text-3xl text-gray-400 mr-1 -mt-1">$</span>
          <input 
            type="number" 
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            autoFocus
            className="bg-transparent border-none outline-none w-full max-w-[180px] p-0 focus:ring-0 text-center placeholder-gray-200 tracking-tight"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10 w-full">
          {['10', '20', '50', '100'].map(val => (
            <button 
              key={val}
              onClick={() => setAmount(val)}
              className="bg-white hover:bg-gray-50 border border-[#E2E8F0] shadow-sm text-[#0F172A] font-bold py-2.5 px-6 rounded-full transition-colors active:scale-95 cursor-pointer text-sm"
            >
              +${val}
            </button>
          ))}
        </div>

        <div className="w-full space-y-4 mb-4 mt-auto">
          <div>
             <p className="text-[13px] font-bold text-[#64748B] mb-2 px-1">Note (Optional)</p>
             <input 
               type="text"
               value={note}
               onChange={(e) => setNote(e.target.value)}
               placeholder="Dinner payment"
               maxLength={40}
               className="w-full bg-white border border-[#E2E8F0] text-[#0F172A] rounded-[12px] px-4 py-3.5 focus:outline-none focus:border-[#E8192C] transition-all text-[13px] font-medium"
             />
          </div>
        </div>
      </div>

      <button
        disabled={!amount || parseFloat(amount) <= 0}
        onClick={handleAmountNext}
        className="w-full h-[56px] rounded-[14px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.97] disabled:opacity-50 mt-4 cursor-pointer"
      >
        Next
      </button>
    </motion.div>
  );

  const renderReviewStep = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col pt-4 pb-6 px-6 overflow-y-auto no-scrollbar"
    >
      <div className="flex flex-col items-center justify-center mb-8 mt-2">
         <div className="w-16 h-16 rounded-full bg-[#EF4444] text-white flex items-center justify-center mb-4">
           <QrCode className="w-8 h-8"/>
         </div>
         <h2 className="text-[20px] font-bold text-[#0F172A] mb-1 font-display">{selectedRecipient?.name}</h2>
         <p className="text-sm font-mono text-[#64748B] font-medium">{selectedRecipient?.phone}</p>
      </div>

      <div className="w-full space-y-4 bg-white border border-[#E2E8F0] rounded-[20px] p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center mb-1">
           <span className="text-[#64748B] text-[13px] font-medium">Amount</span>
           <span className="font-bold text-[#0F172A] text-[15px]">${amount}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
           <span className="text-[#64748B] text-[13px] font-medium">Note</span>
           <span className="font-bold text-[#0F172A] text-[13px] truncate">{note || 'Shopping payment'}</span>
        </div>
        <div className="flex justify-between items-center mb-1">
           <span className="text-[#64748B] text-[13px] font-medium">Payment Method</span>
           <span className="font-bold text-[#0F172A] text-[13px]">Golis Sahal</span>
        </div>
        <div className="flex justify-between items-center mb-4">
           <span className="text-[#64748B] text-[13px] font-medium">Fee</span>
           <span className="font-bold text-[#0F172A] text-[13px]">$0.10</span>
        </div>
        
        <div className="w-full h-[1px] bg-[#E2E8F0] mb-4 border-dashed" />
        <div className="flex justify-between items-center">
           <span className="text-[#0F172A] font-extrabold text-[15px]">Total</span>
           <span className="font-black text-[#E8192C] text-[18px]">${(parseFloat(amount) + 0.1).toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handleReviewConfirm}
        className="w-full h-[56px] rounded-[14px] bg-[#E8192C] text-white shadow-[0_4px_20px_rgba(232,25,44,0.35)] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.97] mt-auto cursor-pointer"
      >
        Confirm Payment
      </button>
    </motion.div>
  );

  const renderSecurityStep = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center pt-4 pb-10 px-6 overflow-y-auto no-scrollbar"
    >
      <div className="w-16 h-16 bg-white border border-[#E2E8F0] shadow-sm rounded-full flex items-center justify-center mb-6 text-[#E8192C]">
        <Lock className="w-7 h-7" />
      </div>
      
      <h2 className="text-[20px] font-bold text-[#0F172A] mb-2 font-display">Enter PIN</h2>
      <p className="text-center text-[#64748B] text-[13px] mb-10 max-w-[250px]">
        Confirm transfer of <span className="font-bold text-[#0F172A] font-mono">${(parseFloat(amount) + 0.1).toFixed(2)}</span>
      </p>

      <div className="flex gap-4 mb-10">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
            pin.length > i ? 'bg-[#E8192C]' : 'bg-[#E2E8F0]'
          }`} />
        ))}
      </div>

      {isProcessing ? (
        <div className="flex flex-col items-center mt-6">
           <div className="w-8 h-8 border-4 border-[#E2E8F0] border-t-[#E8192C] rounded-full animate-spin mb-4" />
        </div>
      ) : (
        <div className="w-full max-w-sm mt-auto pb-4">
          <div className="grid grid-cols-3 gap-y-6 gap-x-6 text-[22px] font-bold text-[#0F172A] font-mono">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button 
                key={num} 
                onClick={() => setPin(prev => prev.length < 4 ? prev + num : prev)}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
              >
                {num}
              </button>
            ))}
            
            <button 
              onClick={handleBiometricAuth}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto hover:bg-gray-50 text-[#64748B] transition-colors cursor-pointer"
            >
              <Fingerprint className="w-7 h-7 stroke-[2.5]" />
            </button>
            
            <button 
              onClick={() => setPin(prev => prev.length < 4 ? prev + '0' : prev)}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            >
              0
            </button>
            
            <button 
              onClick={() => setPin(prev => prev.slice(0, -1))}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-7 h-7 text-[#64748B] stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center pt-8 pb-10 px-6 overflow-y-auto no-scrollbar bg-[#E8192C]"
    >
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
        <CheckCircle2 className="w-10 h-10 text-[#E8192C] stroke-[3]" />
      </div>

      <h2 className="text-[24px] font-display font-extrabold text-white mb-2 tracking-tight">Transfer Sent!</h2>
      <p className="text-white/80 text-[13px] mb-12 font-medium">Txn ID: 801234</p>
      
      <div className="flex flex-col items-center mb-auto">
         <span className="text-white/80 font-bold mb-1 tracking-wide">To {selectedRecipient?.name || "Xalane Supermarket"}</span>
         <span className="text-[44px] font-black text-white font-mono leading-none">${amount}</span>
      </div>

      <button
        onClick={() => navigate('/home')}
        className="w-full h-[56px] rounded-[14px] bg-white text-[#E8192C] font-bold text-[16px] flex items-center justify-center transition-all active:scale-[0.97] cursor-pointer mt-auto"
      >
        Done
      </button>
    </motion.div>
  );

  return (
    <div className="w-full h-full flex flex-col bg-[#F8F9FC] overflow-hidden relative selection:bg-[#E8192C]/20 selection:text-[#E8192C]">
      
      {step !== 'success' && (
        <div className="w-full pt-[calc(20px+env(safe-area-inset-top))] px-5 pb-4 flex items-center justify-center bg-[#F8F9FC] z-20 shadow-none relative">
          <button 
            onClick={() => {
              if (step === 'recipient') navigate(-1);
              else if (step === 'amount') setStep('recipient');
              else if (step === 'review') setStep('amount');
              else if (step === 'security') setStep('review');
            }} 
            className="absolute left-5 w-10 h-10 rounded-full bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#0F172A] hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-[#0F172A]" />
          </button>
          
          <h1 className="text-[16px] font-bold text-[#0F172A] font-display">
             {step === 'review' || step === 'security' ? 'Payment Details' : 'Send Money'}
          </h1>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'recipient' && <React.Fragment key="rec">{renderRecipientStep()}</React.Fragment>}
        {step === 'amount' && <React.Fragment key="amt">{renderAmountStep()}</React.Fragment>}
        {step === 'review' && <React.Fragment key="rev">{renderReviewStep()}</React.Fragment>}
        {step === 'security' && <React.Fragment key="sec">{renderSecurityStep()}</React.Fragment>}
        {step === 'success' && <React.Fragment key="suc">{renderSuccessStep()}</React.Fragment>}
      </AnimatePresence>
    </div>
  );
}
