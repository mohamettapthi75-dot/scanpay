export interface TelecomTransaction {
  id: string;
  amount: number;
  currency: string;
  senderPhone: string;
  receiverPhone: string;
  timestamp: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export abstract class BaseTelecomAdapter {
  protected providerName: string;

  constructor(providerName: string) {
    this.providerName = providerName;
  }

  abstract authenticate(): Promise<boolean>;
  abstract checkBalance(accountData: any): Promise<number>;
  abstract sendMoney(senderPath: any, receiverPath: any, amount: number): Promise<TelecomTransaction>;
  abstract handleWebhook(payload: any): Promise<void>;
}
