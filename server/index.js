import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import { setupSocketHandlers, setupWhatsAppEvents } from './socket/handlers.js';
import { whatsappService } from './services/whatsapp.js';

const app = express();
const server = createServer(app);

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', config.clientUrl],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Enhanced Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', config.clientUrl],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  setupSocketHandlers(socket);
});

// Setup WhatsApp event handlers
setupWhatsAppEvents(io);

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
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
