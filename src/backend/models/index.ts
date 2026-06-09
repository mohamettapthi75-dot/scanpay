export interface User {
  id: string;
  name: string;
  phone: string;
  pinHash: string;
  role: 'CUSTOMER' | 'MERCHANT' | 'ADMIN';
  verified: boolean;
  kycStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
}

export interface Merchant {
  id: string;
  userId: string;
  businessName: string;
  category: string;
  address: string;
  qrId: string;
  settings: {
    notificationsEnabled: boolean;
    autoWithdraw: boolean;
  };
  createdAt: string;
}

export interface LinkedAccount {
  id: string;
  userId: string;
  providerId: 'ZAAD' | 'EVC_PLUS' | 'SAHAL' | 'EDAHAB';
  providerPhone: string;
  isDefault: boolean;
  status: 'ACTIVE' | 'SUSPENDED';
  lastSyncedAt: string;
}

export interface Transaction {
  id: string;
  reference: string;
  senderId: string;
  receiverId: string;
  providerTransactionId?: string; // from Telecom
  amount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  type: 'P2P' | 'MERCHANT_PAYMENT' | 'WITHDRAWAL';
  metadata: any;
  createdAt: string;
}
