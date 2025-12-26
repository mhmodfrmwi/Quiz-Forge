const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

// Questions
router.get("/", questionController.getAllQuestions);
router.post("/", questionController.createQuestion);
router.put("/:id", questionController.updateQuestion);
router.delete("/:id", questionController.deleteQuestion);

// Choices - using 'choices' in path to distinguish
router.get("/:q_id/choices", questionController.getChoices);
router.post("/choices", questionController.createChoice); 
router.put("/choices/:id", questionController.updateChoice);
router.delete("/choices/:id", questionController.deleteChoice);

module.exports = router;
