const { sql, connectDB } = require("../src/config/dbConfig");

async function inspectDept() {
    await connectDB();
    try {
        console.log("Inspecting Department Table...");
        const result = await sql.query`
            SELECT COLUMN_NAME, DATA_TYPE 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Department'
        `;
        console.log(result.recordset);

        console.log("Checking for existing Departments...");
        const depts = await sql.query`SELECT * FROM Department`;
        console.log(depts.recordset);

    } catch (err) {
        console.error("Error:", err);
    }
    process.exit(0);
}

inspectDept();
