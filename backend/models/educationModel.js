const mongoose = require('mongoose');


const educationSchema = new mongoose.Schema({
  institute: {
    type: String,
    required: [true, 'Enter your Institute Name'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Certificate must have User'],
  },
  basicinfo: String,
  instituteLogo: String,
  city: String,
  degree: String,
  startDate: Date,
  endDate: Date,
  grade: String,
  activitiesAndSocieties: String,
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;