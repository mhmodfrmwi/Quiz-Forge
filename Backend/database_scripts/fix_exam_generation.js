const { sql, connectDB } = require("../src/config/dbConfig");

async function fixExamGeneration() {
    await connectDB();
    try {
        await sql.query`
            CREATE OR ALTER PROC sp_generate_exam
                @ex_id int,
                @mcq_cnt int,
                @tf_cnt int,
                @mode nvarchar(20) = 'random' -- Assuming mode might be used later, default to random
            AS
            BEGIN
                SET NOCOUNT ON;
                
                -- 1. Get Course ID for the exam
                DECLARE @crs_id int;
                SELECT @crs_id = crs_id FROM Exam WHERE ex_id = @ex_id;

                IF @crs_id IS NULL
                BEGIN
                    THROW 50001, 'Exam not found or Course ID missing.', 1;
                    RETURN;
                END

                -- 2. Clear existing questions for this exam (Draft mode refresh)
                DELETE FROM exam_question WHERE ex_id = @ex_id;

                -- 3. Insert MCQ Questions
                INSERT INTO exam_question (ex_ID, q_ID, degree)
                SELECT TOP (@mcq_cnt) @ex_id, q_id, default_score
                FROM Question
                WHERE crs_id = @crs_id AND q_type = 'MCQ'
                ORDER BY NEWID();

                -- 4. Insert True/False Questions
                INSERT INTO exam_question (ex_ID, q_ID, degree)
                SELECT TOP (@tf_cnt) @ex_id, q_id, default_score
                FROM Question
                WHERE crs_id = @crs_id AND q_type = 'TF'
                ORDER BY NEWID();
                
            END
        `;
        console.log("✅ Successfully updated sp_generate_exam");
    } catch (err) {
        console.error("❌ Error updating sp_generate_exam:", err.message);
    }
    process.exit(0);
}

fixExamGeneration();
