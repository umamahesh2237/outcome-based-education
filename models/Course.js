const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  regulation: {
    type: String, // changed to String to match the format in the regulations collection
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Course', courseSchema);
