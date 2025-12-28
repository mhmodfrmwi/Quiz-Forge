const { sql, connectDB } = require("../src/config/dbConfig");

async function fixMissingChoices() {
    await connectDB();
    try {
        console.log("🚀 Starting Fix for Missing Choices...");

        // 1. Get all questions that have 0 choices
        const result = await sql.query`
            SELECT q.q_id, q.q_type, q.q_text 
            FROM Question q
            LEFT JOIN Choice c ON q.q_id = c.q_id
            WHERE c.ch_id IS NULL
        `;

        const questions = result.recordset;
        console.log(`Found ${questions.length} questions with no choices.`);

        if (questions.length === 0) {
            console.log("✅ All questions have choices. No action needed.");
            process.exit(0);
        }

        let fixedCount = 0;

        for (const q of questions) {
            console.log(`Fixing Q${q.q_id} (${q.q_type}): ${q.q_text}`);

            if (q.q_type === 'MCQ') {
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option A', ${q.q_id})`;
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option B', ${q.q_id})`;
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option C', ${q.q_id})`;
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option D', ${q.q_id})`;
            } else if (q.q_type === 'TF') {
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('True', ${q.q_id})`;
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('False', ${q.q_id})`;
            } else {
                // Default fallback
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Default Choice', ${q.q_id})`;
            }
            fixedCount++;
        }

        console.log(`✅ Successfully fixed ${fixedCount} questions.`);

    } catch (err) {
        console.error("❌ Error fixing choices:", err.message);
    }
    process.exit(0);
}

fixMissingChoices();
