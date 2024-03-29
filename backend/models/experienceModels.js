const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
  jobTitle: {
    type: 'string',
    required: [true, 'Enter tittle of work experience'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Certificate must have User'],
  },
  organization: {
    type: String,
    required: [true, 'Enter your organization Name'],
  },
  organizationLogo: {
    type: String,
    default:
      'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/company.png',
  },
  remote: {
    type: Boolean,
  },
  city: String,
  website: String,
  startDate: Date,
  endDate: Date,
  duration: Number,
  responsibilities: String,
});
  

const Experience = mongoose.model('Experience', workExperienceSchema);

module.exports = Experience;
