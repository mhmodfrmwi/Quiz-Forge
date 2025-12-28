const { sql, connectDB } = require("../src/config/dbConfig");
const fs = require('fs');

async function checkData() {
    await connectDB();
    try {
        const instructors = await sql.query`SELECT ins_id, ins_name FROM Instructor`;
        let output = "--- INSTRUCTORS ---\n";
        instructors.recordset.forEach(i => output += `ID: ${i.ins_id}, Name: ${i.ins_name}\n`);

        const courses = await sql.query`SELECT crs_id, crs_name FROM Course`;
        output += "\n--- COURSES ---\n";
        courses.recordset.forEach(c => output += `ID: ${c.crs_id}, Name: ${c.crs_name}\n`);

        fs.writeFileSync('ids.txt', output);
        console.log("Written to ids.txt");
    } catch (err) {
        console.error("Error:", err);
    }
    process.exit(0);
}

checkData();
