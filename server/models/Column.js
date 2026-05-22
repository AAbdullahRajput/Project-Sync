const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    order: { type: Number, default: 0 },
    color: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Column', columnSchema);