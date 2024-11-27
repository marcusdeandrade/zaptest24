import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import { setupSocketHandlers, setupWhatsAppEvents } from './socket/handlers.js';
import { whatsappService } from './services/whatsapp.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.clientUrl,
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Socket.io setup
io.on('connection', (socket) => {
  setupSocketHandlers(socket);
});

// Setup WhatsApp event handlers
setupWhatsAppEvents(io);

// Start server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down...');
  await whatsappService.destroy();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});