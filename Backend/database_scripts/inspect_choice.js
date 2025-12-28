const { sql, connectDB } = require("../src/config/dbConfig");

async function inspectChoice() {
    await connectDB();
    try {
        console.log("Inspecting Choice Table...");
        const result = await sql.query`
            SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Choice'
        `;
        console.log(result.recordset);
    } catch (err) {
        console.error("Error:", err);
    }
    process.exit(0);
}

inspectChoice();
