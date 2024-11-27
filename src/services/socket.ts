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
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    console.log('Connecting to socket server at:', SOCKET_URL);
    
    this.socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: RECONNECT_CONFIG.MAX_ATTEMPTS,
      reconnectionDelay: RECONNECT_CONFIG.INTERVAL,
      timeout: 10000,
      transports: ['websocket', 'polling'],
      forceNew: true,
      autoConnect: true
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log('Socket connected successfully');
      this.reconnectAttempts = 0;
      this.emit(SOCKET_EVENTS.CONNECT);
      this.socket?.emit('initialize');
    });

    this.socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
      console.log('Socket disconnected:', reason);
      this.emit(SOCKET_EVENTS.DISCONNECT, reason);
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try reconnecting
        this.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.emit(SOCKET_EVENTS.ERROR, error);
    });

    // WhatsApp specific events
    this.socket.on(SOCKET_EVENTS.QR_CODE, (qr: string) => {
      console.log('QR Code received from socket');
      this.emit(SOCKET_EVENTS.QR_CODE, qr);
    });

    this.socket.on(SOCKET_EVENTS.READY, () => {
      console.log('WhatsApp client ready');
      this.emit(SOCKET_EVENTS.READY);
    });

    this.socket.on(SOCKET_EVENTS.MESSAGE, (message: any) => {
      console.log('New message received:', message);
      this.emit(SOCKET_EVENTS.MESSAGE, message);
    });

    // Handle errors
    this.socket.on('error', (error: any) => {
      console.error('Socket error:', error);
      this.emit(SOCKET_EVENTS.ERROR, error);
    });
  }

  disconnect() {
    console.log('Disconnecting socket...');
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
