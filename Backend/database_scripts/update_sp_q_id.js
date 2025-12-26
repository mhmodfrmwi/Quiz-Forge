const { sql, connectDB } = require("./src/config/dbConfig");

async function updateSp() {
    await connectDB();
    try {
        console.log("Updating sp_exam_question_r_by_exam...");
        await sql.query`
            CREATE OR ALTER PROC sp_exam_question_r_by_exam @ex_id int AS
            BEGIN
               select 
                    eq.ex_id,
                    q.q_id, -- Added q_id
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
        console.log("✅ Updated sp_exam_question_r_by_exam successfully.");
        
    } catch (err) {
        console.error("❌ Error updating SP:", err.message);
    }
    process.exit(0);
}

updateSp();
