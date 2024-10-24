const Course = require('../models/Course');

// Add new course
exports.addCourse = async (req, res) => {
  try {
    const { regulation, semester, courseName, courseCode } = req.body;
    const newCourse = new Course({
      regulation,
      semester,
      courseName,
      courseCode
    });
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add course', error: err.message });
  }
};

// Get courses by regulation and semester
exports.getCoursesByRegulationAndSemester = async (req, res) => {
  try {
    const { regulationId, semester } = req.query;
    const courses = await Course.find({ regulation: regulationId, semester });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};
