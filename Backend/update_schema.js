const { sql, connectDB } = require("./src/config/dbConfig");

async function updateSchema() {
    await connectDB();
    try {
        // 1. Add is_submitted column to Exam table
        try {
            await sql.query`ALTER TABLE Exam ADD is_submitted BIT DEFAULT 0`;
            console.log("✅ Added is_submitted column to Exam table.");
        } catch (err) {
            console.log("⚠️ Column is_submitted might already exist or error:", err.message);
        }

        // 2. Create sp_exam_question_d_by_exam
        try {
            await sql.query`
                CREATE OR ALTER PROC sp_exam_question_d_by_exam @ex_id int AS
                BEGIN
                    DELETE FROM exam_question WHERE ex_id = @ex_id;
                END
            `;
            console.log("✅ Created/Updated sp_exam_question_d_by_exam.");
        } catch (err) {
            console.error("❌ Error creating sp_exam_question_d_by_exam:", err.message);
        }

        // 3. Create sp_exam_submit
        try {
            await sql.query`
                CREATE OR ALTER PROC sp_exam_submit @ex_id int AS
                BEGIN
                    UPDATE Exam SET is_submitted = 1 WHERE ex_id = @ex_id;
                END
            `;
            console.log("✅ Created/Updated sp_exam_submit.");
        } catch (err) {
            console.error("❌ Error creating sp_exam_submit:", err.message);
        }
        
        // 4. Create sp_exam_question_r_by_exam (To return questions after generation)
        try {
            await sql.query`
                CREATE OR ALTER PROC sp_exam_question_r_by_exam @ex_id int AS
                BEGIN
                   select 
                        eq.ex_id,
                        q.q_text,
                        q.q_type, 
                        eq.degree,
                        c.choice_text
                    from exam_question eq
                    join question q on eq.q_id = q.q_id
                    left join choice c on q.q_id = c.q_id
                    where eq.ex_id = @ex_id;
                END
            `;
             console.log("✅ Created/Updated sp_exam_question_r_by_exam.");
        } catch (err) {
             console.error("❌ Error creating sp_exam_question_r_by_exam:", err.message);
        }

    } catch (err) {
        console.error("Global Error:", err);
    }
    process.exit(0);
}

updateSchema();
