const Course = require('../models/Course');

// Add multiple courses at once
exports.addCourse = async (req, res) => {
  try {
    const courses = req.body.courses; // Expect an array of course objects

    // Check if courses is an array and not empty
    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(400).json({ message: 'No courses provided' });
    }

    console.log('Courses received:', courses);

    // Insert multiple courses
    const savedCourses = await Course.insertMany(courses);

    res.status(201).json({ message: 'Courses added successfully', courses: savedCourses });
  } catch (err) {
    console.error('Error in addCourse:', err.message);
    res.status(500).json({ message: 'Failed to add courses', error: err.message });
  }
};

// Get courses by regulation and semester
exports.getCoursesByRegulationAndSemester = async (req, res) => {
  try {
    const { regulation, semester } = req.query; // Adjusted to accept string values for regulation and semester
    const courses = await Course.find({ regulation, semester });
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error in getCoursesByRegulationAndSemester:', err.message);
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};
