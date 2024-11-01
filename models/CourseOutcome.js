const mongoose = require('mongoose');

const courseOutcomeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true, // Index to optimize queries by course
  },
  courseOutcomes: [
    {
      type: String,
      required: true,
      trim: true, // Removes whitespace
    }
  ],
  rubricMapping: [
    {
      rubricId: {
        type: String,
        required: true,
        trim: true,
      },
      mappedOutcomes: [
        {
          type: String,
          required: true,
          enum: ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'], // Limits values to valid course outcomes
        }
      ],
      totalMarks: {
        type: Number,
        required: true,
        min: 0, // Ensures totalMarks is non-negative
      }
    }
  ]
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('CourseOutcome', courseOutcomeSchema);