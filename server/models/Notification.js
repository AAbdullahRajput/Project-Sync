const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['card_assigned', 'comment_added', 'card_moved', 'member_added'],
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);