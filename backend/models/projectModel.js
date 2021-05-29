const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
  },
  included: {
    type: Boolean,
    default: false
  },
  repoID: {
    type: Number
  },
  images: {
    type: [String]
  },
  projectLogo:{
    type: String,
    default:'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/projectIcon.png'
  },
  repoUrl: {
    type: String
  },
  language: {
    type: String
  },
  license: String,
  DemoUrl: {
    type: String
  },
  updated_at: {
    type: Date
  },
  description: {
    type: String
  }
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;