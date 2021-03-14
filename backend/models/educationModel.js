const mongoose = require('mongoose');


const educationSchema = new mongoose.Schema({
    institute: {
      type: String,
      required: [true, 'Enter your Institute Name']
    },basicinfo: String,
    degree: String,
    startDate: Number,
    endDate: Number,
    grade: String,
    activitiesAndSocieties: String,
  });

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;