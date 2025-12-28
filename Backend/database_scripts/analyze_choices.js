const { sql, connectDB } = require("../src/config/dbConfig");

async function analyzeChoices() {
    await connectDB();
    try {
        console.log("Analyzing Choice Counts...");
        const result = await sql.query`
            SELECT q.q_id, q.q_type, COUNT(c.ch_id) as choice_count
            FROM Question q
            LEFT JOIN Choice c ON q.q_id = c.q_id
            GROUP BY q.q_id, q.q_type
            HAVING COUNT(c.ch_id) < 3
        `;

        if (result.recordset.length === 0) {
            console.log("✅ All questions have 3 or more choices.");
        } else {
            console.log(`⚠️ Found ${result.recordset.length} questions with fewer than 3 choices.`);
            console.log(result.recordset);
        }

    } catch (err) {
        console.error("Error:", err);
    }
    process.exit(0);
}

analyzeChoices();
