const { sql, connectDB } = require("./src/config/dbConfig");

async function updateProcs() {
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
                END
            `;
            console.log("✅ Updated sp_question_c");
        } catch (err) {
            console.error("❌ Error updating sp_question_c:", err.message);
        }

        // Update sp_question_u
        try {
            await sql.query`
                CREATE OR ALTER PROC sp_question_u
                    @id int,
                    @text nvarchar(max),
                    @type nvarchar(50),
                    @score int,
                    @correct nvarchar(max),
                    @crs_id int,
                    @top_id int
                AS
                BEGIN
                    UPDATE Question
                    SET q_text = @text, q_type = @type, default_score = @score, correct_choice = @correct, crs_id = @crs_id, top_id = @top_id
                    WHERE q_id = @id;
                END
            `;
            console.log("✅ Updated sp_question_u");
        } catch (err) {
            console.error("❌ Error updating sp_question_u:", err.message);
        }

    } catch (err) {
        console.error("Global Error:", err);
    }
    process.exit(0);
}

updateProcs();
