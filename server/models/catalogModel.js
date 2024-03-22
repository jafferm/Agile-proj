// models/catalogModel.js
const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  structureType: { type: String, default: 'house' },
  userId: { type: Number, required: true },
  images: [{type: String }],
  tags: [{ type: String }],
  files: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Catalog', catalogSchema);