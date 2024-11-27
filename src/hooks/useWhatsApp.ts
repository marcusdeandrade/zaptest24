import { useEffect, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { whatsappService } from '../services/whatsapp';
import { socketService } from '../services/socket';

export function useWhatsApp() {
  const { isConnected, qrCode, setQrCode, setIsConnected } = useStore((state) => ({
    isConnected: state.isConnected,
    qrCode: state.qrCode,
    setQrCode: state.setQrCode,
    setIsConnected: state.setIsConnected
  }));

  useEffect(() => {
    // Setup socket event listeners
    socketService.on('qr', (qr: string) => {
      console.log('QR code received in hook');
      setQrCode(qr);
    });

    socketService.on('ready', () => {
      console.log('WhatsApp ready in hook');
      setIsConnected(true);
      setQrCode(null);
    });

    socketService.on('disconnected', () => {
      console.log('WhatsApp disconnected in hook');
      setIsConnected(false);
      setQrCode(null);
    });

    // Initialize WhatsApp service
    whatsappService.initialize();

    // Cleanup
    return () => {
      socketService.removeAllListeners();
    };
  }, [setQrCode, setIsConnected]);

  const reconnect = useCallback(() => {
    console.log('Reconnecting WhatsApp...');
    whatsappService.disconnect();
    whatsappService.initialize();
  }, []);

  const sendMessage = useCallback(async (to: string, message: string) => {
    if (!isConnected) {
      throw new Error('WhatsApp is not connected');
    }
    return whatsappService.sendMessage(to, message);
  }, [isConnected]);

  return {
    isConnected,
    qrCode,
    sendMessage,
    reconnect,
  };
}
