import { Client } from 'whatsapp-web.js';
import { config } from '../config/index.js';
import { EventEmitter } from 'events';
import qrcode from 'qrcode-terminal';

class WhatsAppService extends EventEmitter {
  constructor() {
    super();
    this.client = null;
    this.isInitializing = false;
  }

  async initialize() {
    if (this.client || this.isInitializing) return;

    try {
      console.log('Initializing WhatsApp service...');
      this.isInitializing = true;
      
      this.client = new Client({
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--deterministic-fetch',
            '--disable-features=IsolateOrigins',
            '--disable-site-isolation-trials'
          ],
          defaultViewport: null
        }
      });

      this.setupEventListeners();
      console.log('Starting WhatsApp client initialization...');
      await this.client.initialize();
      console.log('WhatsApp client initialization completed');
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
      console.log('QR Code received from WhatsApp');
      // Display QR in terminal for debugging
      qrcode.generate(qr, { small: true });
      this.emit('qr', qr);
    });

    this.client.on('ready', () => {
      console.log('WhatsApp client is ready');
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

    this.client.on('auth_failure', (error) => {
      console.error('WhatsApp authentication failed:', error);
      this.emit('error', error);
    });

    this.client.on('loading_screen', (percent, message) => {
      console.log('WhatsApp loading screen:', percent, message);
    });

    // Add additional debug events
    this.client.on('change_state', state => {
      console.log('WhatsApp client state changed to:', state);
    });

    this.client.on('change_battery', batteryInfo => {
      console.log('Phone battery changed:', batteryInfo);
    });
  }

  async sendMessage(to, message) {
    if (!this.client) {
      throw new Error('WhatsApp client not initialized');
    }

    try {
      console.log('Attempting to send message to:', to);
      const chatId = to.includes('@c.us') ? to : `${to}@c.us`;
      const result = await this.client.sendMessage(chatId, message);
      console.log('Message sent successfully');
      return result;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  cleanup() {
    console.log('Cleaning up WhatsApp client...');
    if (this.client) {
      this.client.destroy();
      this.client = null;
    }
    console.log('WhatsApp client cleanup completed');
  }

  async destroy() {
    console.log('Destroying WhatsApp service...');
    await this.cleanup();
    this.removeAllListeners();
    console.log('WhatsApp service destroyed');
  }
}

export const whatsappService = new WhatsAppService();
