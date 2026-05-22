const Notification = require('../models/Notification');

const sendNotification = async (io, { recipient, sender, type, project, card, message }) => {
  try {
    // Save to database
    const notification = await Notification.create({
      recipient,
      sender,
      type,
      project,
      card,
      message,
      isRead: false,
    });

    // Emit to recipient's personal socket room in real time
    io.to(`user:${recipient}`).emit('notification:new', notification);
  } catch (error) {
    console.error('sendNotification error:', error.message);
  }
};

module.exports = sendNotification;