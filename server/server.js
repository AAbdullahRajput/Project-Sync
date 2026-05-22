const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const socketHandler = require('./socket/socketHandler');

// Import all routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const columnRoutes = require('./routes/columnRoutes');
const cardRoutes = require('./routes/cardRoutes');
const commentRoutes = require('./routes/commentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load env variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
const httpServer = http.createServer(app);

// Attach Socket.io to HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

// Register all socket events
socketHandler(io);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Make io accessible in controllers via req.io
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount all routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'API is running' }));

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));