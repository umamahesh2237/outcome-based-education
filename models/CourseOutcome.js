const mongoose = require('mongoose');

const courseOutcomeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  courseOutcomes: [
    {
      type: String,
      required: true,
    }
  ],
  rubricMapping: [
    {
      rubricId: {
        type: String,
        required: true,
      },
      courseOutcome: {
        type: String,
        required: true,
      },
      totalMarks: {
        type: Number,
        required: true,
      }
    }
  ]
});

module.exports = mongoose.model('CourseOutcome', courseOutcomeSchema);
