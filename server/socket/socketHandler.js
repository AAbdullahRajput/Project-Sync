const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    // User joins their personal notification room
    socket.on('user:join', (userId) => {
      socket.join(`user:${userId}`);
    });

    // User joins a project board room → sees all live updates
    socket.on('join:project', (projectId) => {
      socket.join(`project:${projectId}`);
      socket.to(`project:${projectId}`).emit('presence:update', {
        socketId: socket.id,
        status: 'online',
      });
    });

    // User leaves project room
    socket.on('leave:project', (projectId) => {
      socket.leave(`project:${projectId}`);
    });

    // Card moved to different column → broadcast to all in project
    socket.on('card:move', (data) => {
      socket.to(`project:${data.projectId}`).emit('card:moved', data);
    });

    // Card content updated (title, desc, priority etc)
    socket.on('card:update', (data) => {
      socket.to(`project:${data.projectId}`).emit('card:updated', data);
    });

    // New card created
    socket.on('card:create', (data) => {
      socket.to(`project:${data.projectId}`).emit('card:created', data);
    });

    // Card deleted
    socket.on('card:delete', (data) => {
      socket.to(`project:${data.projectId}`).emit('card:deleted', data);
    });

    // New comment added to a card
    socket.on('comment:new', (data) => {
      socket.to(`project:${data.projectId}`).emit('comment:added', data);
    });

    // Typing indicator in comment box
    socket.on('user:typing', (data) => {
      socket.to(`project:${data.projectId}`).emit('user:typing', data);
    });

    // On disconnect → notify project room
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;