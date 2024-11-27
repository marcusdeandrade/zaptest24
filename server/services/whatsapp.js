import { Client, LocalAuth } from 'whatsapp-web.js';
import { config } from '../config/index.js';
import { EventEmitter } from 'events';

class WhatsAppService extends EventEmitter {
  constructor() {
    super();
    this.client = null;
    this.isInitializing = false;
  }

  async initialize() {
    if (this.client || this.isInitializing) return;

    try {
      this.isInitializing = true;
      this.client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
          args: config.puppeteerArgs,
          headless: true
        }
      });

      this.setupEventListeners();
      await this.client.initialize();
    } catch (error) {
      console.error('WhatsApp initialization failed:', error);
      this.emit('error', error);
      this.cleanup();
    } finally {
      this.isInitializing = false;
    }
  }

  setupEventListeners() {
    if (!this.client) return;

    this.client.on('qr', (qr) => {
      console.log('QR code received');
      this.emit('qr', qr);
    });

    this.client.on('ready', () => {
      console.log('WhatsApp client ready');
      this.emit('ready');
    });

    this.client.on('message', (message) => {
      console.log('Message received:', message.body);
      this.emit('message', {
        id: message.id.id,
        from: message.from,
        body: message.body,
        timestamp: message.timestamp,
      });
    });

    this.client.on('disconnected', (reason) => {
      console.log('WhatsApp client disconnected:', reason);
      this.emit('disconnected', reason);
      this.cleanup();
    });
  }

  async sendMessage(to, message) {
    if (!this.client) {
      throw new Error('WhatsApp client not initialized');
    }

    const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
    return this.client.sendMessage(chatId, message);
  }

  cleanup() {
    if (this.client) {
      this.client.destroy();
      this.client = null;
    }
  }

  async destroy() {
    await this.cleanup();
    this.removeAllListeners();
  }
}

export const whatsappService = new WhatsAppService();