const { sql, connectDB } = require("./src/config/dbConfig");

async function updateProcsRet() {
    await connectDB();
    try {
        // Update sp_question_c
        try {
            await sql.query`
                CREATE OR ALTER PROC sp_question_c
                    @text nvarchar(max),
                    @type nvarchar(50),
                    @score int,
                    @correct nvarchar(max),
                    @crs_id int,
                    @top_id int
                AS
                BEGIN
                    INSERT INTO Question (q_text, q_type, default_score, correct_choice, crs_id, top_id)
                    VALUES (@text, @type, @score, @correct, @crs_id, @top_id);
                    
                    SELECT * FROM Question WHERE q_id = SCOPE_IDENTITY();
                END
            `;
            console.log("✅ Updated sp_question_c to return row");
        } catch (err) {
            console.error("❌ Error updating sp_question_c:", err.message);
        }

        // Update sp_choice_c
        try {
            // Need to check params for choice_c first? Assuming text and q_id based on controller.
            // Let's rely on standard params found in controller: text, q_id
            await sql.query`
                CREATE OR ALTER PROC sp_choice_c
                    @text nvarchar(max),
                    @q_id int
                AS
                BEGIN
                    INSERT INTO Choice (choice_text, q_id)
                    VALUES (@text, @q_id);
                    
                    SELECT * FROM Choice WHERE ch_id = SCOPE_IDENTITY();
                END
            `;
            console.log("✅ Updated sp_choice_c to return row");
        } catch (err) {
            console.error("❌ Error updating sp_choice_c:", err.message);
        }

        // Update sp_exam_c
        try {
            // Controller: dur, total, crs_id, ins_id
            await sql.query`
                CREATE OR ALTER PROC sp_exam_c
                    @dur int,
                    @total int,
                    @crs_id int,
                    @ins_id int
                AS
                BEGIN
                    INSERT INTO Exam (duration, total_score, crs_id, ins_id)
                    VALUES (@dur, @total, @crs_id, @ins_id);
                    
                    SELECT * FROM Exam WHERE ex_id = SCOPE_IDENTITY();
                END
            `;
            console.log("✅ Updated sp_exam_c to return row");
        } catch (err) {
            console.error("❌ Error updating sp_exam_c:", err.message);
        }

    } catch (err) {
        console.error("Global Error:", err);
    }
    process.exit(0);
}

updateProcsRet();
