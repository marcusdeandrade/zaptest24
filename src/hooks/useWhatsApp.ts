import { useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { whatsappService } from '../services/whatsapp';

export function useWhatsApp() {
  const { isConnected, qrCode } = useStore();

  useEffect(() => {
    whatsappService.initialize();
    return () => {
      whatsappService.disconnect();
    };
  }, []);

  const sendMessage = useCallback(async (to: string, message: string) => {
    if (!isConnected) {
      throw new Error('WhatsApp is not connected');
    }
    return whatsappService.sendMessage(to, message);
  }, [isConnected]);

  const reconnect = useCallback(() => {
    whatsappService.disconnect();
    whatsappService.initialize();
  }, []);

  return {
    isConnected,
    qrCode,
    sendMessage,
    reconnect,
  };
}