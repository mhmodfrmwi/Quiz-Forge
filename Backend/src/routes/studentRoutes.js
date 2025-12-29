const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:id/courses', studentController.getStudentCourses);
router.get('/course/:courseId/exams', studentController.getAvailableExams);
router.get('/exam/:examId/questions', studentController.getExamQuestions);
router.post('/exam/submit', studentController.submitExamAnswers);
router.get('/:id/report', studentController.getStudentReport);
router.post('/assign-course', studentController.assignStudentToCourse);

module.exports = router;
