export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  ERROR: 'error',
  QR_CODE: 'qr',
  READY: 'ready',
  MESSAGE: 'message',
  SEND_MESSAGE: 'sendMessage',
} as const;

export const RECONNECT_CONFIG = {
  MAX_ATTEMPTS: 5,
  INTERVAL: 5000,
} as const;
