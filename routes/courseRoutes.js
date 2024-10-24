const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to add a new course
router.post('/add', courseController.addCourse);

// Route to get courses by regulation and semester
router.get('/by-regulation-semester', courseController.getCoursesByRegulationAndSemester);

module.exports = router;
