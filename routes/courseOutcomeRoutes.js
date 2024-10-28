const express = require('express');
const router = express.Router();
const courseOutcomeController = require('../controllers/courseOutcomeController');

// Route to add a new course outcome
router.post('/add', courseOutcomeController.addCourseOutcome);

// Route to get course outcomes by course ID
router.get('/by-course', courseOutcomeController.getCourseOutcomesByCourse);

module.exports = router;