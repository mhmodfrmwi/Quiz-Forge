const { sql, connectDB } = require("../src/config/dbConfig");

async function fixExamCorrection() {
    await connectDB();
    try {
        await sql.query`
            CREATE OR ALTER PROC sp_ExamCorrection
                @student_ID int,
                @exam_ID int
            AS
            BEGIN
                SET NOCOUNT ON;

                -- 1. Update Student_Exam_Answer (isCorrect, score)
                UPDATE Student_Exam_Answer
                SET 
                    isCorrect = CASE WHEN SEA.student_Answer = Q.correct_choice THEN 1 ELSE 0 END,
                    score = CASE WHEN SEA.student_Answer = Q.correct_choice THEN EQ.degree ELSE 0 END
                FROM Student_Exam_Answer SEA
                JOIN Question Q ON SEA.question_ID = Q.q_id
                JOIN Exam_Question EQ ON EQ.q_ID = Q.q_id AND EQ.ex_ID = SEA.exam_ID
                WHERE SEA.student_ID = @student_ID AND SEA.exam_ID = @exam_ID;

                -- 2. Calculate Scores
                DECLARE @totalScore int = 0;
                DECLARE @maxScore int = 0;

                SELECT @totalScore = ISNULL(SUM(score), 0)
                FROM Student_Exam_Answer 
                WHERE student_ID = @student_ID AND exam_ID = @exam_ID;

                SELECT @maxScore = ISNULL(SUM(degree), 0)
                FROM Exam_Question 
                WHERE ex_ID = @exam_ID;

                -- 3. Calculate Percentage
                DECLARE @percentage DECIMAL(5, 2) = 0;
                IF @maxScore > 0
                    SET @percentage = CAST((@totalScore * 100.0 / @maxScore) AS DECIMAL(5, 2));

                -- 4. Get Course ID
                DECLARE @crs_id int;
                SELECT @crs_id = crs_id FROM Exam WHERE ex_id = @exam_ID;

                -- 5. Update Course Grade
                IF EXISTS (SELECT 1 FROM st_crs_grade WHERE st_id = @student_ID AND crs_id = @crs_id)
                BEGIN
                    UPDATE st_crs_grade
                    SET grade = @percentage
                    WHERE st_id = @student_ID AND crs_id = @crs_id;
                END
                ELSE
                BEGIN
                    INSERT INTO st_crs_grade (st_id, crs_id, grade)
                    VALUES (@student_ID, @crs_id, @percentage);
                END

                -- 6. Return Result
                SELECT 
                    @student_ID as Student_ID,
                    @exam_ID as Exam_ID,
                    @totalScore as Total_Score,
                    @maxScore as Full_Mark,
                    @percentage as Percentage;
            END
        `;
        console.log("✅ Successfully updated sp_ExamCorrection");
    } catch (err) {
        console.error("❌ Error updating sp_ExamCorrection:", err.message);
    }
    process.exit(0);
}

fixExamCorrection();
