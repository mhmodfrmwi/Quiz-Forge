const { sql } = require("../config/dbConfig");

const getAllExams = async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.execute("sp_exam_r");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createExam = async (req, res) => {
  const { dur, total, crs_id, ins_id } = req.body;
  try {
    const request = new sql.Request();
    request.input("dur", sql.Int, dur);
    request.input("total", sql.Int, total);
    request.input("crs_id", sql.Int, crs_id);
    request.input("ins_id", sql.Int, ins_id);
    const result = await request.execute("sp_exam_c");
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExam = async (req, res) => {
  const { id } = req.params;
  const { dur, total } = req.body;
  try {
    const request = new sql.Request();
    request.input("ex_id", sql.Int, id);
    request.input("dur", sql.Int, dur);
    request.input("total", sql.Int, total);
    await request.execute("sp_exam_u");
    res.json({ message: "Exam updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const request = new sql.Request();
    request.input("ex_id", sql.Int, id);
    await request.execute("sp_exam_d");
    res.json({ message: "Exam deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const generateExam = async (req, res) => {
  const { ex_id, mcq_cnt, tf_cnt, mode } = req.body;
  try {
    const request = new sql.Request();
    request.input("ex_id", sql.Int, ex_id);

    // 1. Check if exam is already submitted
    const checkResult = await request.query(`SELECT is_submitted FROM Exam WHERE ex_id = @ex_id`);
    if (checkResult.recordset.length > 0 && checkResult.recordset[0].is_submitted) {
       return res.status(400).json({ message: "Exam is already submitted and cannot be regenerated." });
    }

    // 2. Clear previous draft questions
    await request.execute("sp_exam_question_d_by_exam");

    // 3. Generate new questions
    request.input("mcq_cnt", sql.Int, mcq_cnt);
    request.input("tf_cnt", sql.Int, tf_cnt);
    request.input("mode", sql.NVarChar, mode);
    await request.execute("sp_generate_exam");

    // 4. Return the generated questions (Draft View)
    // We reuse the request object which might have inputs set? better create new one or just execute query
    // Stored procedure sp_generate_exam is void, so we need another query to get questions
    // I created sp_exam_question_r_by_exam in update_schema.js
    const getQuestionsReq = new sql.Request();
    getQuestionsReq.input("ex_id", sql.Int, ex_id);
    const questionsResult = await getQuestionsReq.execute("sp_exam_question_r_by_exam");

    res.json({ 
        message: "Exam generated successfully (Draft Mode)", 
        questions: questionsResult.recordset 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitExam = async (req, res) => {
    const { ex_id } = req.body;
    try {
        const request = new sql.Request();
        request.input("ex_id", sql.Int, ex_id);
        await request.execute("sp_exam_submit");
        res.json({ message: "Exam submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
  getAllExams,
  createExam,
  updateExam,
  deleteExam,
  generateExam,
  submitExam
};
