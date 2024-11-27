import { User } from './index';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: User | null; // null for system messages
  type: 'text' | 'image' | 'document' | 'voice';
  status: 'sent' | 'delivered' | 'read';
  metadata?: {
    fileName?: string;
    fileSize?: number;
    mimeType?: string;
    duration?: number;
  };
}

export interface Chat {
  id: string;
  contact: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  tags: Tag[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  activeChat: Chat | null;
  chats: Chat[];
  tags: Tag[];
  setActiveChat: (chat: Chat | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  addTag: (tag: Tag) => void;
  removeTag: (tagId: string) => void;
  addTagToChat: (chatId: string, tagId: string) => void;
  removeTagFromChat: (chatId: string, tagId: string) => void;
}