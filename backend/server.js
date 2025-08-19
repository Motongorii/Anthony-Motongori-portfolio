const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import models
const PageView = require('./models/PageView');
const UserInteraction = require('./models/UserInteraction');
const Comment = require('./models/Comment');
const Like = require('./models/Like');

// Import routes
const analyticsRoutes = require('./routes/analytics');
const commentRoutes = require('./routes/comments');
const likeRoutes = require('./routes/likes');
const trackingRoutes = require('./routes/tracking');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] 
      : ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/analytics', analyticsRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/tracking', trackingRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join admin room for real-time updates
  socket.on('join-admin', (data) => {
    if (data.password === process.env.ADMIN_PASSWORD) {
      socket.join('admin-room');
      socket.emit('admin-joined', { message: 'Welcome to admin dashboard' });
    } else {
      socket.emit('admin-error', { message: 'Invalid password' });
    }
  });

  // Handle real-time analytics updates
  socket.on('request-analytics', async () => {
    try {
      const [pageViews, interactions, comments, likes] = await Promise.all([
        PageView.getRealTimeStats(),
        UserInteraction.countDocuments({ timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
        Comment.countDocuments({ timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
        Like.getRealTimeLikeStats()
      ]);

      socket.emit('analytics-update', {
        pageViews,
        interactions,
        comments,
        likes
      });
    } catch (error) {
      console.error('Error fetching real-time analytics:', error);
      socket.emit('analytics-error', { message: 'Error fetching analytics' });
    }
  });

  // Handle page view tracking
  socket.on('page-view', async (data) => {
    try {
      const pageView = new PageView({
        page: data.page,
        url: data.url,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        referrer: data.referrer,
        sessionId: data.sessionId,
        device: data.device,
        browser: data.browser,
        os: data.os
      });

      await pageView.save();

      // Emit to admin room for real-time updates
      io.to('admin-room').emit('new-page-view', {
        page: data.page,
        timestamp: new Date(),
        sessionId: data.sessionId
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  });

  // Handle user interactions
  socket.on('user-interaction', async (data) => {
    try {
      const interaction = new UserInteraction({
        sessionId: data.sessionId,
        page: data.page,
        type: data.type,
        element: data.element,
        coordinates: data.coordinates,
        duration: data.duration,
        scrollDepth: data.scrollDepth,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        metadata: data.metadata
      });

      await interaction.save();

      // Emit to admin room for real-time updates
      io.to('admin-room').emit('new-interaction', {
        type: data.type,
        page: data.page,
        timestamp: new Date(),
        sessionId: data.sessionId
      });
    } catch (error) {
      console.error('Error tracking user interaction:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  
  // Start server
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics`);
    console.log(`💬 Comments API: http://localhost:${PORT}/api/comments`);
    console.log(`👍 Likes API: http://localhost:${PORT}/api/likes`);
    console.log(`📈 Tracking API: http://localhost:${PORT}/api/tracking`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close();
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    mongoose.connection.close();
  });
});

module.exports = { app, server, io };
