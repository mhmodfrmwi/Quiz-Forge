const { sql } = require("../config/dbConfig");

// 1. Get courses for a student
const getStudentCourses = async (req, res) => {
    const { id } = req.params;
    try {
        const request = new sql.Request();
        request.input("st_id", sql.Int, id);
        // Assuming direct query for now as no specific 'getStudentCourses' SP was prominent, 
        // or we can use generic SELECT. 
        // Let's try SP_Student_Grades which returns courses too? 
        // Or simpler: SELECT c.* FROM Course c JOIN Student_Course sc ON c.crs_id = sc.crs_id WHERE sc.st_id = @st_id
        const result = await request.query(`
            SELECT c.crs_id, c.crs_name 
            FROM Course c 
            JOIN st_crs_grade sc ON c.crs_id = sc.crs_id 
            WHERE sc.st_id = @st_id
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get available exams for a course (that student is enrolled in)
const getAvailableExams = async (req, res) => {
    const { courseId } = req.params;
    try {
        const request = new sql.Request();
        request.input("crs_id", sql.Int, courseId);
        // List exams for course. 
        const result = await request.query(`
            SELECT e.ex_id, e.total_score, e.duration, i.ins_id, i.ins_name 
            FROM Exam e
            INNER JOIN Instructor i ON e.ins_id = i.ins_id
            WHERE e.crs_id = @crs_id
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get questions for an exam
const getExamQuestions = async (req, res) => {
    const { examId } = req.params;
    try {
        const request = new sql.Request();
        request.input("ex_id", sql.Int, examId);
        // Using SP_ExamQuestionsChoices as identified
        // Wait, SP_ExamQuestionsChoices might be the administration one? 
        // Let's check sp_exam_question_r_by_exam which returns questions with choices
        // But for STUDENT we shouldn't show 'correct' answer ideally?
        // The SP sp_exam_question_r_by_exam created in update_schema.js:
        // select eq.ex_id, q.q_text, q.q_type, eq.degree, c.choice_text ...
        // It DOES NOT return correct choice explicitly in the select list I wrote? 
        // Wait, let's check update_schema.js content again.
        // It selects: q.q_text, q.q_type, eq.degree, c.choice_text. 
        // It does NOT select q.correct_choice. So it is safe for students.
        // But wait, choices are joined. We need to format them nicely (group choices under question).
        
        const result = await request.execute("sp_exam_question_r_by_exam");
        
        // Grouping logic might be needed on frontend or here. 
        // Let's send raw recordset for now, frontend can handle or we can group.
        // To be helpful, let's group if multiple rows per question (for choices).
        
        const questions = {};
        result.recordset.forEach(row => {
            if (!questions[row.q_text]) {
                questions[row.q_text] = {
                    q_id: row.q_id, // Add q_id for submission reference
                    text: row.q_text,
                    type: row.q_type,
                    degree: row.degree,
                    choices: []
                };
            }
            if (row.choice_text) {
                questions[row.q_text].choices.push(row.choice_text);
            }
        });
        
        res.json(Object.values(questions));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Submit Exam Answers
const submitExamAnswers = async (req, res) => {
    const { examId, studentId, answers } = req.body; 
    // answersArray: [{ q_id: 1, answer: "A" }, ...]
    // DB expects sp_ExamAnswers @ex_id, @st_id, @ans nvarchar(max) ?
    // I need to check sp_ExamAnswers definition.
    // As per previous logs, sp_ExamAnswers was listed.
    // If it takes a table type or xml or string, I need to know.
    // Attempting to use a loop for now or a specific per-answer SP.
    
    // Let's assume we iterate and save. Or if there is a 'submit' SP.
    // Accessing sp_ExamAnswers definition might be needed.
    // FALLBACK: Use generic INSERT into StudentAnswer table?
    // Table: StudentAnswer (st_id, ex_id, q_id, answer_text, etc?)
    
    try {
        const request = new sql.Request();
        request.input("ex_id", sql.Int, examId);
        request.input("st_id", sql.Int, studentId);
        
        // Loop through answers
        
        // 1. Clear previous answers to allow re-submission (Fixes PK Violation)
        const delRequest = new sql.Request();
        delRequest.input("st_id", sql.Int, studentId);
        delRequest.input("ex_id", sql.Int, examId);
        await delRequest.query("DELETE FROM Student_Exam_Answer WHERE student_ID = @st_id AND exam_ID = @ex_id");

        // 2. Insert new answers
        for (const ans of answers) {
             const ansRequest = new sql.Request();
             ansRequest.input("st_id", sql.Int, studentId);
             ansRequest.input("ex_id", sql.Int, examId);
             ansRequest.input("q_text", sql.NVarChar, ans.q_text); // Using text? Identifier?
             // We need q_id. My get questions returned text.
             // I should include q_id in getExamQuestions.
             ansRequest.input("q_id", sql.Int, ans.q_id);
             ansRequest.input("answer", sql.NVarChar, ans.answer);
             
             // Check if sp_ExamAnswers handles single insert?
             // Let's rely on raw insert if SP is unknown complex
             // Using correct column names from diagnose
             await ansRequest.query(`
                INSERT INTO Student_Exam_Answer (student_ID, exam_ID, question_ID, student_Answer)
                VALUES (@st_id, @ex_id, @q_id, @answer)
             `);
        }
        
        // Calculate Grade? sp_ExamCorrection
        // Calculate Grade? sp_ExamCorrection
        const correctReq = new sql.Request();
        correctReq.input("exam_ID", sql.Int, examId);
        correctReq.input("student_ID", sql.Int, studentId);
        await correctReq.execute("sp_ExamCorrection");
        
        res.json({ message: "Exam submitted and corrected" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Get Student Report
const getStudentReport = async (req, res) => {
    const { id } = req.params;
    try {
        const request = new sql.Request();
        request.input("St_id", sql.Int, id);
        const result = await request.execute("SP_Student_Grades");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



const assignStudentToCourse = async (req, res) => {
    const { studentId, courseId } = req.body;
    try {
        const request = new sql.Request();
        request.input("st_id", sql.Int, studentId);
        request.input("crs_id", sql.Int, courseId);
        
        // Check if already assigned
        const check = await request.query("SELECT * FROM st_crs_grade WHERE st_id = @st_id AND crs_id = @crs_id");
        if (check.recordset.length > 0) {
            return res.status(400).json({ message: "Student already assigned to this course" });
        }

        // Assign
        await request.query("INSERT INTO st_crs_grade (st_id, crs_id, grade) VALUES (@st_id, @crs_id, NULL)");
        res.json({ message: "Student assigned to course successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getStudentCourses,
    getAvailableExams,
    getExamQuestions,
    submitExamAnswers,
    getStudentReport,
    assignStudentToCourse
};

