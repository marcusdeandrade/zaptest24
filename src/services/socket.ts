import { io, Socket } from 'socket.io-client';
import { EventEmitter } from '../lib/EventEmitter';
import { SOCKET_URL, SOCKET_EVENTS, RECONNECT_CONFIG } from '../config/constants';

class SocketService extends EventEmitter {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;

  private constructor() {
    super();
  }

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect() {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      reconnection: false,
      timeout: 10000,
      transports: ['websocket', 'polling'],
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Socket connected');
      this.reconnectAttempts = 0;
      this.emit(SOCKET_EVENTS.CONNECT);
      this.socket?.emit('initialize');
    });

    this.socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log('Socket disconnected:', reason);
      this.handleReconnect();
      this.emit(SOCKET_EVENTS.DISCONNECT, reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.handleReconnect();
      this.emit(SOCKET_EVENTS.ERROR, error);
    });

    // WhatsApp specific events
    this.socket.on(SOCKET_EVENTS.QR_CODE, (qr: string) => {
      this.emit(SOCKET_EVENTS.QR_CODE, qr);
    });

    this.socket.on(SOCKET_EVENTS.READY, () => {
      this.emit(SOCKET_EVENTS.READY);
    });

    this.socket.on(SOCKET_EVENTS.MESSAGE, (message: any) => {
      this.emit(SOCKET_EVENTS.MESSAGE, message);
    });
  }

  private handleReconnect() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
    }

    if (this.reconnectAttempts < RECONNECT_CONFIG.MAX_ATTEMPTS) {
      this.reconnectAttempts++;
      this.reconnectTimer = window.setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.disconnect();
        this.connect();
      }, RECONNECT_CONFIG.INTERVAL);
    } else {
      this.emit('reconnect_failed');
    }
  }

  disconnect() {
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, ...args: any[]): void {
    if (event === SOCKET_EVENTS.SEND_MESSAGE && this.socket) {
      this.socket.emit(event, ...args);
    } else {
      super.emit(event, ...args);
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    super.on(event, callback);
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = SocketService.getInstance();