import { create } from 'zustand';
import type { ChatState, Chat, Message, Tag } from '../types/chat';

export const useChatStore = create<ChatState>((set) => ({
  activeChat: null,
  chats: [],
  tags: [
    { id: '1', name: 'Lead', color: '#22c55e' },
    { id: '2', name: 'Hot', color: '#ef4444' },
    { id: '3', name: 'Cold', color: '#3b82f6' },
    { id: '4', name: 'Follow Up', color: '#f59e0b' },
  ],

  setActiveChat: (chat) => set({ activeChat: chat }),

  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message,
              updatedAt: new Date(),
            }
          : chat
      ),
    })),

  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag],
    })),

  removeTag: (tagId) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== tagId),
      chats: state.chats.map((chat) => ({
        ...chat,
        tags: chat.tags.filter((tag) => tag.id !== tagId),
      })),
    })),

  addTagToChat: (chatId, tagId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              tags: [...chat.tags, state.tags.find((t) => t.id === tagId)!],
            }
          : chat
      ),
    })),

  removeTagFromChat: (chatId, tagId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              tags: chat.tags.filter((tag) => tag.id !== tagId),
            }
          : chat
      ),
    })),
}));