const CourseOutcome = require('../models/CourseOutcome');

// Add new course outcome
exports.addCourseOutcome = async (req, res) => {
  try {
    const { course, courseOutcomes, rubricMapping } = req.body;
    const newCourseOutcome = new CourseOutcome({
      course,
      courseOutcomes,
      rubricMapping
    });
    const savedCourseOutcome = await newCourseOutcome.save();
    res.status(201).json(savedCourseOutcome);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add course outcome', error: err.message });
  }
};

// Get course outcomes by course ID
exports.getCourseOutcomesByCourse = async (req, res) => {
  try {
    const { courseId } = req.query;
    const courseOutcomes = await CourseOutcome.find({ course: courseId });
    res.status(200).json(courseOutcomes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch course outcomes', error: err.message });
  }
};
