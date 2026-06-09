import { create } from 'zustand'

export type AccountType = 'customer' | 'merchant' | null

export type Language = 'en' | 'so' | 'ar'

export type Theme = 'light' | 'dark'

export interface Network {
  id: string
  name: string
  color: string
  balance: number
}

// QR Code Generation utility
export function generateUniqueQR(id: string, phone: string, name: string, type: 'CUSTOMER' | 'MERCHANT') {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const cleanName = name.trim();
  const hash = btoa(id + cleanPhone + Date.now())
    .replace(/[^A-Z0-9]/gi, '')
    .substring(0, 8);

  return `SPAY:${id}:${cleanPhone}:${cleanName}:${type}:${hash}`;
}

export function isGolisSahalNumber(phone: string): boolean {
  const clean = phone.replace(/[^0-9]/g, '');
  let local = clean;
  if (clean.startsWith('252')) {
    local = clean.substring(3);
  }
  // Reject Telesom (63), Hormuud (61), Somtel (62)
  if (local.startsWith('61') || local.startsWith('62') || local.startsWith('63')) {
    return false;
  }
  // Accept standard Golis/Sahal (starts with 90, 75, 77 or is standard Puntland length)
  return local.startsWith('90') || local.startsWith('75') || local.startsWith('77') || local.length === 7;
}

interface AppState {
  isLoggedIn: boolean
  isAdminAuthenticated: boolean
  userId: string | null
  userPhone: string | null
  userName: string | null
  userPin: string | null
  accountType: AccountType
  language: Language
  theme: Theme
  linkedNetworks: Network[]
  primaryNetworkId: string | null
  merchantCategory: string | null
  userQrCode: string | null
  
  // Actions
  login: (phone: string, pin: string, name?: string) => void
  logout: () => void
  loginAdmin: () => void
  logoutAdmin: () => void
  register: (phone: string, pin: string, name?: string) => void
  setAccountType: (type: AccountType) => void
  setMerchantCategory: (category: string) => void
  setLanguage: (lang: Language) => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  addNetwork: (network: Network) => void
  setPrimaryNetwork: (id: string) => void
  updateBalance: (networkId: string, diff: number) => void
}

const INITIAL_NETWORKS: Network[] = [
  { id: 'sahal', name: 'Golis Sahal', color: 'bg-blue-600', balance: 542.40 }
]

export const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  isAdminAuthenticated: false,
  userId: null,
  userPhone: null,
  userName: null,
  userPin: null,
  accountType: null, // User will select this
  merchantCategory: null,
  language: 'en',
  theme: 'dark',
  linkedNetworks: INITIAL_NETWORKS,
  primaryNetworkId: 'sahal',
  userQrCode: null,

  login: (phone, pin, fullName) => set((state) => {
    const isMerchant = phone.toLowerCase().includes("shop") || phone.toLowerCase().includes("pharmacy") || phone.toLowerCase().includes("cafe");
    const id = isMerchant ? 'M101' : 'U101';
    const name = fullName ? fullName : (isMerchant ? 'Ali Shop' : 'Abdullahi');
    const type = isMerchant ? 'merchant' : 'customer';
    const qr = generateUniqueQR(id, phone, name, isMerchant ? 'MERCHANT' : 'CUSTOMER');
    return { 
      isLoggedIn: true, 
      userPhone: phone, 
      userPin: pin,
      userName: name,
      accountType: type,
      userId: id,
      userQrCode: qr
    };
  }),
  logout: () => set({ 
    isLoggedIn: false, 
    userPhone: null, 
    userId: null, 
    userName: null, 
    userPin: null, 
    accountType: null, 
    merchantCategory: null,
    userQrCode: null 
  }),
  loginAdmin: () => set({ isAdminAuthenticated: true }),
  logoutAdmin: () => set({ isAdminAuthenticated: false }),
  register: (phone, pin, name) => set((state) => {
    const id = 'U' + (Math.floor(Math.random() * 900) + 100);
    const resolvedName = name || 'Ahmed Hassan';
    const qr = generateUniqueQR(id, phone, resolvedName, 'CUSTOMER');
    return { 
      isLoggedIn: true, 
      userPhone: phone, 
      userPin: pin, 
      userName: resolvedName,
      userId: id,
      userQrCode: qr
    };
  }),
  setAccountType: (type) => set((state) => {
    if (!type) return { accountType: null };
    const prefix = type === 'customer' ? 'U' : 'M';
    const randNum = Math.floor(Math.random() * 900) + 100;
    const id = `${prefix}${randNum}`;
    const phone = state.userPhone || '7538881';
    const name = state.userName || 'Ahmed Hassan';
    const qr = generateUniqueQR(id, phone, name, type === 'customer' ? 'CUSTOMER' : 'MERCHANT');
    return { 
      accountType: type,
      userId: id,
      userQrCode: qr
    };
  }),
  setMerchantCategory: (category) => set({ merchantCategory: category }),
  setLanguage: (lang) => set({ language: lang }),
  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return { theme: newTheme };
  }),
  addNetwork: (network) => set((state) => ({ linkedNetworks: [...state.linkedNetworks, network] })),
  setPrimaryNetwork: (id) => set({ primaryNetworkId: id }),
  updateBalance: (networkId, diff) => set((state) => ({
    linkedNetworks: state.linkedNetworks.map(n => 
      n.id === networkId ? { ...n, balance: n.balance + diff } : n
    )
  })),
}))
