import { whatsappService } from '../services/whatsapp.js';

export function setupSocketHandlers(socket) {
  console.log('Client connected');

  socket.on('initialize', async () => {
    try {
      await whatsappService.initialize();
    } catch (error) {
      socket.emit('error', { message: 'Failed to initialize WhatsApp' });
    }
  });

  socket.on('sendMessage', async (data, callback) => {
    try {
      const { to, message } = data;
      await whatsappService.sendMessage(to, message);
      callback({ success: true });
    } catch (error) {
      console.error('Error sending message:', error);
      callback({ error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}

export function setupWhatsAppEvents(io) {
  whatsappService.on('qr', (qr) => {
    io.emit('qr', qr);
  });

  whatsappService.on('ready', () => {
    io.emit('ready');
  });

  whatsappService.on('message', (message) => {
    io.emit('message', message);
  });

  whatsappService.on('disconnected', () => {
    io.emit('disconnected');
  });

  whatsappService.on('error', (error) => {
    io.emit('error', { message: error.message });
  });
}