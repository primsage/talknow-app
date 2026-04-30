import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Message from './models/Message';
import seedAdmin from './seed';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import widgetRoutes from './routes/widgetRoutes';
import adminRoutes from './routes/adminRoutes';
import paymentRoutes from './routes/paymentRoutes';
import integrationRoutes from './routes/integrationRoutes';
import teamRoutes from './routes/teamRoutes';
import webhookRoutes from './routes/webhookRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/widget', widgetRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/integration', integrationRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/webhook', webhookRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/talknow';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    seedAdmin();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.io for Real-time Chat
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on('send_message', async (data) => {
    // data: { visitorId, text, sender, visitorName, businessId, agentId }
    const { visitorId, text, sender, visitorName, businessId, agentId } = data;

    try {
      const message = new Message({
        businessId,
        visitorId,
        sender,
        text,
        visitorName,
        agentId
      });
      await message.save();

      io.to(visitorId).emit('receive_message', message);
      // Also notify business owner/agents
      io.to(`business_${businessId}`).emit('receive_message', message);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('TalkNow API is running');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
