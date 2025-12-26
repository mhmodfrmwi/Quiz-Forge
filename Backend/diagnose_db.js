const { sql, connectDB } = require("./src/config/dbConfig");

async function diagnose() {
    await connectDB();
    try {
        // Check if ch_id is identity
        const result = await sql.query`
            SELECT name, is_identity, is_nullable
            FROM sys.columns 
            WHERE object_id = OBJECT_ID('Choice') AND name = 'ch_id'
        `;
        console.log("Column Info:", JSON.stringify(result.recordset, null, 2));

        // Check SP definition
        const sp = await sql.query`
            SELECT OBJECT_DEFINITION(OBJECT_ID('sp_choice_c')) as definition
        `;
        console.log("SP Definition:", sp.recordset[0].definition);
    } catch (err) {
        console.error("Diagnosis Error:", err);
    }
    process.exit(0);
}

diagnose();
