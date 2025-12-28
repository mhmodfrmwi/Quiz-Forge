const { sql, connectDB } = require("../src/config/dbConfig");

async function ensureThreeChoices() {
    await connectDB();
    try {
        console.log("🚀 Ensuring all questions have at least 3 choices...");

        // Get questions with < 3 choices
        const result = await sql.query`
            SELECT q.q_id, q.q_type, COUNT(c.ch_id) as choice_count
            FROM Question q
            LEFT JOIN Choice c ON q.q_id = c.q_id
            GROUP BY q.q_id, q.q_type
            HAVING COUNT(c.ch_id) < 3
        `;

        const questions = result.recordset;
        if (questions.length === 0) {
            console.log("✅ All questions already have 3+ choices.");
            process.exit(0);
        }

        console.log(`Found ${questions.length} questions to fix.`);

        for (const q of questions) {
            const missingCount = 3 - q.choice_count;
            console.log(`Fixing Q${q.q_id} (${q.q_type}): Adding ${missingCount} choices.`);

            for (let i = 1; i <= missingCount; i++) {
                const choiceText = q.q_type === 'TF' 
                    ? `Neither` // Semi-logical 3rd option for TF
                    : `Supplemental Choice ${i}`;
                
                await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES (${choiceText}, ${q.q_id})`;
            }
        }

        console.log("✅ Fix complete.");

    } catch (err) {
        console.error("❌ Error ensuring choices:", err.message);
    }
    process.exit(0);
}

ensureThreeChoices();
