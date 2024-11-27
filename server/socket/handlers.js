import { whatsappService } from '../services/whatsapp.js';

export function setupSocketHandlers(socket) {
  console.log('New client connected:', socket.id);

  socket.on('initialize', async () => {
    console.log('Received initialize request from client:', socket.id);
    try {
      await whatsappService.initialize();
      console.log('WhatsApp service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize WhatsApp:', error);
      socket.emit('error', { message: 'Failed to initialize WhatsApp', details: error.message });
    }
  });

  socket.on('sendMessage', async (data, callback) => {
    console.log('Received sendMessage request:', data);
    try {
      const { to, message } = data;
      await whatsappService.sendMessage(to, message);
      console.log('Message sent successfully');
      callback({ success: true });
    } catch (error) {
      console.error('Error sending message:', error);
      callback({ error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
}

export function setupWhatsAppEvents(io) {
  whatsappService.on('qr', (qr) => {
    console.log('Broadcasting QR code to all clients');
    io.emit('qr', qr);
  });

  whatsappService.on('ready', () => {
    console.log('Broadcasting ready state to all clients');
    io.emit('ready');
  });

  whatsappService.on('message', (message) => {
    console.log('Broadcasting new message to all clients:', message);
    io.emit('message', message);
  });

  whatsappService.on('disconnected', (reason) => {
    console.log('Broadcasting disconnected state to all clients:', reason);
    io.emit('disconnected', reason);
  });

  whatsappService.on('error', (error) => {
    console.error('Broadcasting error to all clients:', error);
    io.emit('error', { message: error.message });
  });

  // Log all events for debugging
  const events = ['qr', 'ready', 'message', 'disconnected', 'error'];
  events.forEach(event => {
    whatsappService.on(event, (...args) => {
      console.log(`WhatsApp Event [${event}]:`, ...args);
    });
  });
}
