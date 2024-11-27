import { socketService } from './socket';
import { useStore } from '../store/useStore';

class WhatsAppService {
  private initialized = false;

  initialize() {
    if (this.initialized) return;

    socketService.connect();
    this.setupEventListeners();
    this.initialized = true;
  }

  private setupEventListeners() {
    socketService.on('qr', (qr: string) => {
      useStore.getState().setQrCode(qr);
    });

    socketService.on('ready', () => {
      useStore.getState().setIsConnected(true);
      useStore.getState().setQrCode(null);
    });

    socketService.on('disconnected', () => {
      useStore.getState().setIsConnected(false);
      useStore.getState().setQrCode(null);
    });

    socketService.on('error', (error: Error) => {
      console.error('WhatsApp error:', error);
      useStore.getState().addLog({
        type: 'error',
        timestamp: new Date(),
        description: 'WhatsApp connection error',
        details: { error: error.message }
      });
    });
  }

  async sendMessage(to: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!socketService.isConnected()) {
        reject(new Error('Not connected to WhatsApp service'));
        return;
      }

      socketService.emit('sendMessage', { to, message }, (response: any) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve();
        }
      });
    });
  }

  disconnect() {
    socketService.disconnect();
    this.initialized = false;
  }
}

export const whatsappService = new WhatsAppService();