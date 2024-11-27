export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  contact: string;
  lastMessage: string;
  timestamp: Date;
  status: 'active' | 'archived';
  unreadCount: number;
}

export interface SystemConfig {
  openaiApiKey: string;
  organizationId: string;
  assistantId: string;
  model: string;
  responseDelay: {
    min: number;
    max: number;
  };
  notifications: {
    email: string;
    webhook?: string;
  };
}

export interface Assistant {
  id: string;
  name: string;
  type: 'customer-service' | 'sales' | 'support' | 'custom';
  isActive: boolean;
}

export interface Metric {
  label: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error';
  description: string;
  details?: Record<string, unknown>;
}