export type Channel =
  | "WHATSAPP"
  | "GMAIL"
  | "INSTAGRAM"
  | "FACEBOOK"
  | "TELEGRAM"
  | "WEBSITE";

export type LeadTemperature = "HOT" | "WARM" | "COLD";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "CONVERTED"
  | "LOST";

export type ConversationStatus =
  | "OPEN"
  | "WAITING"
  | "RESOLVED";

export interface Business {
  id: string;
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  timezone: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  createdAt: string;
  lastContactAt?: string;
}

export interface Conversation {
  id: string;
  businessId: string;
  customerId: string;
  channel: Channel;
  status: ConversationStatus;
  subject?: string;
  lastMessageAt?: string;
  unreadCount: number;
  aiEnabled: boolean;
  createdAt: string;
}

export interface Lead {
  id: string;
  businessId: string;
  customerId: string;
  temperature: LeadTemperature;
  status: LeadStatus;
  estimatedValue?: number;
  source: Channel;
  createdAt: string;
  lastActivityAt?: string;
}

export interface FollowUp {
  id: string;
  businessId: string;
  customerId: string;
  conversationId?: string;
  scheduledFor: string;
  completed: boolean;
  reason: string;
  createdAt: string;
}

export interface DashboardSummary {
  activeConversations: number;
  openLeads: number;
  hotLeads: number;
  overdueFollowUps: number;
  revenueAtRisk: number;
  revenueRecovered: number;
}
