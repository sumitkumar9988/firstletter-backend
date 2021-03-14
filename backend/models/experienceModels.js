const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    jobTitle: {
      type: 'string',
      required: [true, 'Enter tittle of work experience']
    },
    organization: {
      type: String,
      required: [true, 'Enter your organization Name']
    },
    startDate: String,
    endDate: String,
    duration: Number,
    responsibilities:String,
  });
  

const Experience = mongoose.model('Experience', workExperienceSchema);

module.exports = Experience;
