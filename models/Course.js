const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  regulation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Regulation',
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
