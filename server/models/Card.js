const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    labels: [{ text: String, color: String }],
    dueDate: { type: Date },
    checklist: [{ text: String, completed: { type: Boolean, default: false } }],
    order: { type: Number, default: 0 },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);