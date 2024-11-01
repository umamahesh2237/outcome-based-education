const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to add a new course
router.post('/addCourse', courseController.addCourse);

// Route to get courses by regulation and semester (updated with route parameters)
router.get('/:regulation/:semester', courseController.getCoursesByRegulationAndSemester);

module.exports = router;