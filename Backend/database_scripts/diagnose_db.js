const { sql, connectDB } = require("./src/config/dbConfig");

async function diagnose() {
    await connectDB();
    try {
        // Check parameters of sp_ExamCorrection
        const params = await sql.query`
            SELECT name 
            FROM sys.parameters 
            WHERE object_id = OBJECT_ID('sp_ExamCorrection')
        `;
        console.log("Correction Params:", params.recordset.map(p => p.name));
    } catch (err) {
        console.error("Diagnosis Error:", err);
    }
    process.exit(0);
}

diagnose();
