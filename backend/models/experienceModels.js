const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    jobTitle: String,
    organization: String,
    startDate: String,
    endDate: String,
    duration: Number,
    responsibilities:String,
  });
  

const Experience = mongoose.model('Experience', workExperienceSchema);

module.exports = Experience;
