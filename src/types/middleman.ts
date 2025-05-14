export interface Middleman {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  expertise: string[];
  description: string;
  transactions: number;
  successRate: string;
  email?: string;
  phone?: string;
  socialHandle?: string;
  profession?: string;
  isAvailable?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderType: 'buyer' | 'seller' | 'middleman';
  content: string;
  timestamp: Date;
  transactionId?: string;
  imageUrl?: string;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  type: 'buyer' | 'seller' | 'middleman';
  transactionId?: string;
  initials?: string;
}

export interface PendingTransaction {
  id: string;
  buyerName: string;
  sellerName: string;
  middlemanName?: string;
  item: string;
  price: string; // This represents price in Philippine Pesos (₱)
  date: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}
