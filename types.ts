import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  phoneNumber?: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
  tech: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface MarketItem {
  id: string;
  number: string;
  price: number;
  type: 'Google Voice' | 'TextNow' | 'Talkatone' | 'Ring4' | 'Sideline' | 'TextFree' | 'TextPlus' | 'TextMe' | 'Dingtone' | 'Gmail/iPhone' | 'GV Setup' | 'Other';
  year: number;
  status: 'available' | 'sold';
  rating: number;
  tags?: string[];
  buyEnabled?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string; // 'user-id' or 'admin-id'
  timestamp: Date;
  isSystem?: boolean;
}

export interface Conversation {
  userId: string;
  userName: string;
  userEmail: string;
  messages: ChatMessage[];
  unreadCount: number;
  lastMessageAt: Date;
}