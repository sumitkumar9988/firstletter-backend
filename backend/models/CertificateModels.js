const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Certificate must have User'],
  },
  name: {
    type: String,
    required: [true, 'Certificate must have Name'],
  },
  image: {
    type: String,
    required: [true, 'Upload Your Certificate'],
  },
  isseueDate: { type: Date },
  Organization: {
    type: String,
    required: [true, 'Certificate must have Orignization'],
  },
  learning: { type: String },
  url: { type: String },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
