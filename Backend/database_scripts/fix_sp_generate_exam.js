const { sql, connectDB } = require("../src/config/dbConfig");

async function updateSpGenerateExam() {
    await connectDB();
    try {
        await sql.query`
            CREATE OR ALTER PROC sp_generate_exam
            @ex_id int,
            @mcq_cnt int,
            @tf_cnt int,
            @mode nvarchar(20)
            AS
            BEGIN
                DECLARE @easy_pct float, @med_pct float, @hard_pct float;
                
                IF @mode = 'hard'
                BEGIN
                    SET @easy_pct = 0.1;
                    SET @med_pct = 0.3;
                    SET @hard_pct = 0.6;
                END
                ELSE IF @mode = 'easy'
                BEGIN
                    SET @easy_pct = 0.6;
                    SET @med_pct = 0.3;
                    SET @hard_pct = 0.1;
                END
                ELSE
                BEGIN
                    SET @easy_pct = 0.2;
                    SET @med_pct = 0.6;
                    SET @hard_pct = 0.2;
                END

                DECLARE @crs_id int;
                SELECT @crs_id = crs_id FROM exam WHERE ex_id = @ex_id;

                -- MCQ Calculations
                DECLARE @mcq_easy int = FLOOR(@mcq_cnt * @easy_pct);
                DECLARE @mcq_med int = FLOOR(@mcq_cnt * @med_pct);
                DECLARE @mcq_hard int = @mcq_cnt - (@mcq_easy + @mcq_med);

                INSERT INTO exam_question (ex_id, q_id, degree)
                SELECT TOP (@mcq_easy) @ex_id, q_id, default_score
                FROM question 
                WHERE crs_id = @crs_id AND q_type='mcq' AND default_score BETWEEN 1 AND 2
                ORDER BY NEWID();

                INSERT INTO exam_question (ex_id, q_id, degree)
                SELECT TOP (@mcq_med) @ex_id, q_id, default_score
                FROM question 
                WHERE crs_id = @crs_id AND q_type='mcq' AND default_score BETWEEN 3 AND 5
                ORDER BY NEWID();

                INSERT INTO exam_question (ex_id, q_id, degree)
                SELECT TOP (@mcq_hard) @ex_id, q_id, default_score
                FROM question 
                WHERE crs_id = @crs_id AND q_type='mcq' AND default_score > 5
                ORDER BY NEWID();

                -- True/False Calculations
                DECLARE @tf_easy int = FLOOR(@tf_cnt * @easy_pct);
                DECLARE @tf_med int = FLOOR(@tf_cnt * @med_pct);
                DECLARE @tf_hard int = @tf_cnt - (@tf_easy + @tf_med);

                INSERT INTO exam_question (ex_id, q_id, degree)
                SELECT TOP (@tf_easy) @ex_id, q_id, default_score
                FROM question 
                WHERE crs_id = @crs_id AND q_type='tf' AND default_score BETWEEN 1 AND 2
                ORDER BY NEWID();

                INSERT INTO exam_question (ex_id, q_id, degree)
                SELECT TOP (@tf_med) @ex_id, q_id, default_score
                FROM question 
                WHERE crs_id = @crs_id AND q_type='tf' AND default_score BETWEEN 3 AND 5
                ORDER BY NEWID();

                INSERT INTO exam_question (ex_id, q_id, degree)
                SELECT TOP (@tf_hard) @ex_id, q_id, default_score
                FROM question 
                WHERE crs_id = @crs_id AND q_type='tf' AND default_score > 5
                ORDER BY NEWID();

            END;
        `;
        console.log("✅ Updated sp_generate_exam successfully");
    } catch (err) {
        console.error("❌ Error updating sp_generate_exam:", err);
    }
    process.exit(0);
}

updateSpGenerateExam();
