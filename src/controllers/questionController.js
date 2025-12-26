const { sql } = require("../config/dbConfig");

// Questions
const getAllQuestions = async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.execute("sp_question_r");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createQuestion = async (req, res) => {
  const { text, type, score, correct, crs_id } = req.body;
  try {
    const request = new sql.Request();
    request.input("text", sql.NVarChar, text);
    request.input("type", sql.NVarChar, type);
    request.input("score", sql.Int, score);
    request.input("correct", sql.NVarChar, correct);
    request.input("crs_id", sql.Int, crs_id);
    await request.execute("sp_question_c");
    res.status(201).json({ message: "Question created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, type, score, correct, crs_id } = req.body;
  try {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    request.input("text", sql.NVarChar, text);
    request.input("type", sql.NVarChar, type);
    request.input("score", sql.Int, score);
    request.input("correct", sql.NVarChar, correct);
    request.input("crs_id", sql.Int, crs_id);
    await request.execute("sp_question_u");
    res.json({ message: "Question updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const request = new sql.Request();
    request.input("id", sql.Int, id);
    await request.execute("sp_question_d");
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Choices
const getChoices = async (req, res) => {
  const { q_id } = req.params;
  try {
    const request = new sql.Request();
    request.input("q_id", sql.Int, q_id);
    const result = await request.execute("sp_choice_r");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createChoice = async (req, res) => {
  const { text, q_id } = req.body;
  try {
    const request = new sql.Request();
    request.input("text", sql.NVarChar, text);
    request.input("q_id", sql.Int, q_id);
    await request.execute("sp_choice_c");
    res.status(201).json({ message: "Choice created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateChoice = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const request = new sql.Request();
    request.input("ch_id", sql.Int, id);
    request.input("text", sql.NVarChar, text);
    await request.execute("sp_choice_u");
    res.json({ message: "Choice updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteChoice = async (req, res) => {
  const { id } = req.params;
  try {
    const request = new sql.Request();
    request.input("ch_id", sql.Int, id);
    await request.execute("sp_choice_d");
    res.json({ message: "Choice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getChoices,
  createChoice,
  updateChoice,
  deleteChoice,
};
