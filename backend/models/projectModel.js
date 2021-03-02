const mongoose = require('mongoose');


const projectItemSchema = new mongoose.Schema({
  institute: {
    type: String,
  },
  basicinfo: String,
  degree: String,
  startDate: Number,
  endDate: Number,
  grade: String,
  activitiesAndSocieties: String,
});



const projectSchema = new mongoose.Schema({
 project:[projectItemSchema],
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
