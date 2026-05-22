const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);