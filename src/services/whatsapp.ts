import { socketService } from './socket';
import { useStore } from '../store/useStore';

class WhatsAppService {
  private initialized = false;

  initialize() {
    if (this.initialized) {
      console.log('WhatsApp service already initialized');
      return;
    }

    console.log('Initializing WhatsApp service...');
    socketService.connect();
    this.setupEventListeners();
    this.initialized = true;
  }

  private setupEventListeners() {
    console.log('Setting up WhatsApp event listeners...');

    socketService.on('qr', (qr: string) => {
      console.log('QR code received from server');
      useStore.getState().setQrCode(qr);
    });

    socketService.on('ready', () => {
      console.log('WhatsApp connection ready');
      useStore.getState().setIsConnected(true);
      useStore.getState().setQrCode(null);
      useStore.getState().addLog({
        type: 'info',
        timestamp: new Date(),
        description: 'WhatsApp connected successfully'
      });
    });

    socketService.on('disconnected', () => {
      console.log('WhatsApp disconnected');
      useStore.getState().setIsConnected(false);
      useStore.getState().setQrCode(null);
      useStore.getState().addLog({
        type: 'warning',
        timestamp: new Date(),
        description: 'WhatsApp disconnected'
      });
    });

    socketService.on('error', (error: Error) => {
      console.error('WhatsApp error:', error);
      useStore.getState().setIsConnected(false);
      useStore.getState().addLog({
        type: 'error',
        timestamp: new Date(),
        description: 'WhatsApp connection error',
        details: { error: error.message }
      });
    });

    // Add connection status logging
    socketService.on('connect', () => {
      console.log('Socket connected to server');
      useStore.getState().addLog({
        type: 'info',
        timestamp: new Date(),
        description: 'Socket connected to server'
      });
    });

    socketService.on('disconnect', () => {
      console.log('Socket disconnected from server');
      useStore.getState().addLog({
        type: 'warning',
        timestamp: new Date(),
        description: 'Socket disconnected from server'
      });
    });
  }

  async sendMessage(to: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!socketService.isConnected()) {
        const error = new Error('Not connected to WhatsApp service');
        console.error(error);
        reject(error);
        return;
      }

      console.log('Sending message to:', to);
      socketService.emit('sendMessage', { to, message }, (response: any) => {
        if (response.error) {
          console.error('Failed to send message:', response.error);
          reject(new Error(response.error));
        } else {
          console.log('Message sent successfully');
          resolve();
        }
      });
    });
  }

  disconnect() {
    console.log('Disconnecting WhatsApp service...');
    socketService.disconnect();
    this.initialized = false;
    useStore.getState().setIsConnected(false);
    useStore.getState().setQrCode(null);
  }
}

export const whatsappService = new WhatsAppService();
