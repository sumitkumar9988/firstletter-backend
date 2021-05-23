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
  instituteLogo: {
    type: String,
    default:
      'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/university.png',
  },
  city: String,
  degree: String,
  startDate: Date,
  endDate: Date,
  grade: String,
  activitiesAndSocieties: String,
});

// educationSchema.pre('save', function (next) {
//   if (this.instituteLogo === null || 'null') {
//     this.instituteLogo =
//       'https://firstletter-multimedia.s3.ap-south-1.amazonaws.com/university.png';
//   }
//   next();
// });

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
