/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { useStore } from "./store";
import TopLoadingBar from "./components/TopLoadingBar";

// Client Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recover from "./pages/Recover";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import SendMoney from "./pages/SendMoney";
import MyCode from "./pages/MyCode";
import Welcome from "./pages/Welcome";
import Splash from "./pages/Splash";
import AccountType from "./pages/AccountType";
import MerchantCategory from "./pages/MerchantCategory";
import MerchantDashboard from "./pages/MerchantDashboard";
import MerchantSupport from "./pages/MerchantSupport";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import PersonalInfo from "./pages/profile/PersonalInfo";
import LinkedAccounts from "./pages/profile/LinkedAccounts";
import Security from "./pages/profile/Security";
import Language from "./pages/profile/Language";
import Settings from "./pages/profile/Settings";
import Showcase from "./pages/Showcase";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminMerchants from "./pages/admin/AdminMerchants";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminQR from "./pages/admin/AdminQR";
import AdminFraud from "./pages/admin/AdminFraud";
import AdminSystem from "./pages/admin/AdminSystem";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSupport from "./pages/admin/AdminSupport";

function ClientAnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <TopLoadingBar />
      <AnimatePresence mode="wait" initial={false}>
        {/* @ts-expect-error React Router does accept key but missing in types */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/account-type" element={<AccountType />} />
          <Route path="/merchant-category" element={<MerchantCategory />} />
          <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
          <Route path="/merchant-support" element={<MerchantSupport />} />
          <Route path="/home" element={<Home />} />
          <Route path="/scan" element={<Scanner />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/my-code" element={<MyCode />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/personal-info" element={<PersonalInfo />} />
          <Route path="/profile/linked-accounts" element={<LinkedAccounts />} />
          <Route path="/profile/security" element={<Security />} />
          <Route path="/profile/language" element={<Language />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/pay/:merchantId" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function ClientAppWrapper() {
  const location = useLocation();
  const setAccountType = useStore(state => state.setAccountType);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('force') === 'merchant') {
      setAccountType('merchant');
    }
  }, []);

  return (
    <div className="w-full h-[100dvh] overflow-hidden text-[#0F172A] font-sans max-w-md mx-auto relative shadow-[0_30px_80px_rgba(0,0,0,0.1)] sm:border sm:border-[#E2E8F0] sm:rounded-[24px] flex flex-col bg-[#F8F9FC] selection:bg-[#E8192C]/20 selection:text-[#E8192C]">
      <div className="relative z-10 flex flex-col flex-1 h-full w-full bg-[#F8F9FC]">
        <ClientAnimatedRoutes />
      </div>
    </div>
  );
}

export default function App() {
  const { theme } = useStore();

  useEffect(() => {
    // Explicitly remove dark mode if it was previously set, 
    // to strictly enforce the new cohesive white/red fintech UI
    document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Showcase / Presentation Route Unscoped */}
        <Route path="/showcase" element={<Showcase />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="merchants" element={<AdminMerchants />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="qr" element={<AdminQR />} />
          <Route path="fraud" element={<AdminFraud />} />
          <Route path="system" element={<AdminSystem />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="support" element={<AdminSupport />} />
        </Route>

        {/* Client Routes Wrapper */}
        <Route path="/*" element={<ClientAppWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
