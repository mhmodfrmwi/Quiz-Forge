const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/assign', courseController.assignStudentToCourse);
router.get('/', courseController.getAllCourses);

module.exports = router;
