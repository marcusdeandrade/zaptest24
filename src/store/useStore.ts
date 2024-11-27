import { create } from 'zustand';
import type { User, SystemConfig, Conversation, LogEntry } from '../types';

interface State {
  user: User | null;
  isConnected: boolean;
  qrCode: string | null;
  conversations: Conversation[];
  config: SystemConfig | null;
  logs: LogEntry[];
  setUser: (user: User | null) => void;
  setIsConnected: (status: boolean) => void;
  setQrCode: (qrCode: string | null) => void;
  setConfig: (config: SystemConfig) => void;
  addLog: (log: Omit<LogEntry, 'id'>) => void;
  clearLogs: () => void;
}

export const useStore = create<State>((set) => ({
  user: null,
  isConnected: false,
  qrCode: null,
  conversations: [],
  config: null,
  logs: [],
  setUser: (user) => set({ user }),
  setIsConnected: (isConnected) => {
    console.log('Setting connection status:', isConnected);
    set({ isConnected });
  },
  setQrCode: (qrCode) => {
    console.log('Setting QR code:', qrCode ? 'received' : 'cleared');
    set({ qrCode });
  },
  setConfig: (config) => set({ config }),
  addLog: (log) =>
    set((state) => ({
      logs: [{ ...log, id: crypto.randomUUID() }, ...state.logs],
    })),
  clearLogs: () => set({ logs: [] }),
}));
