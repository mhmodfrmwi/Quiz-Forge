const { sql, connectDB } = require("../src/config/dbConfig");

async function inspectTable() {
    await connectDB();
    try {
        console.log("Inspecting Student Table...");
        const result = await sql.query`
            SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Student'
        `;
        console.log(result.recordset);

        console.log("Inspecting Instructor Table...");
        const resultIns = await sql.query`
            SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Instructor'
        `;
        console.log(resultIns.recordset);

    } catch (err) {
        console.error("Error:", err);
    }
    process.exit(0);
}

inspectTable();
