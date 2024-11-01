const CourseOutcome = require('../models/CourseOutcome');
const mongoose = require('mongoose');

// Add a new course outcome with rubric mappings
exports.addCourseOutcome = async (req, res) => {
  try {
    const { course, courseOutcomes, rubricMapping } = req.body;

    // Validate course ObjectId
    if (!course || !mongoose.Types.ObjectId.isValid(course)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Validate course outcomes array
    if (!Array.isArray(courseOutcomes) || courseOutcomes.length === 0) {
      return res.status(400).json({ message: 'Course outcomes are required' });
    }

    // Validate and process rubricMapping
    const processedRubricMapping = Array.isArray(rubricMapping)
      ? rubricMapping.map((rubric) => ({
          rubricId: rubric.rubricId,
          mappedOutcomes: Array.isArray(rubric.mappedOutcomes)
            ? rubric.mappedOutcomes
            : rubric.mappedOutcomes.split(',').map((co) => co.trim()),
          totalMarks: rubric.totalMarks,
        }))
      : [];

    // Ensure each rubric has a rubricId and mappedOutcomes is not empty
    for (let rubric of processedRubricMapping) {
      if (!rubric.rubricId) {
        return res.status(400).json({ message: 'Each rubric must have a rubricId' });
      }
      if (!rubric.mappedOutcomes || rubric.mappedOutcomes.length === 0) {
        return res.status(400).json({ message: 'Each rubric must have mapped outcomes' });
      }
    }

    // Create new CourseOutcome document
    const newCourseOutcome = new CourseOutcome({
      course,
      courseOutcomes: courseOutcomes.filter((outcome) => outcome.trim() !== ''), // Only non-empty outcomes
      rubricMapping: processedRubricMapping,
    });

    // Save to the database
    const savedCourseOutcome = await newCourseOutcome.save();
    res.status(201).json(savedCourseOutcome);
  } catch (error) {
    console.error('Error adding course outcome:', error?.message || error);
    res.status(500).json({ message: 'Failed to add course outcome', error: error?.message || 'Unknown error' });
  }
};

// Get course outcomes by course ID
exports.getCourseOutcomesByCourse = async (req, res) => {
  try {
    const { courseId } = req.query;

    // Validate courseId parameter
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Valid courseId query parameter is required' });
    }

    const courseOutcomes = await CourseOutcome.find({ course: courseId });
    res.status(200).json(courseOutcomes);
  } catch (err) {
    console.error('Failed to fetch course outcomes:', err?.message || err);
    res.status(500).json({ message: 'Failed to fetch course outcomes', error: err?.message || 'Unknown error' });
  }
};