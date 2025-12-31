const { sql, connectDB } = require("../src/config/dbConfig");

async function verifyFix() {
    await connectDB();
    try {
        // 1. Find a valid student and exam to value
        const data = await sql.query`
            SELECT TOP 1 SEA.student_ID, SEA.exam_ID 
            FROM Student_Exam_Answer SEA
        `;
        
        if (data.recordset.length === 0) {
            console.log("No student answers found to test with.");
            return;
        }

        const { student_ID, exam_ID } = data.recordset[0];
        console.log(`Testing with Student: ${student_ID}, Exam: ${exam_ID}`);

        // 2. Run Correction
        await sql.query`EXEC sp_ExamCorrection @student_ID = ${student_ID}, @exam_ID = ${exam_ID}`;
        console.log("Executed sp_ExamCorrection");

        // 3. Get Course ID for that exam
        const examData = await sql.query`SELECT crs_id FROM Exam WHERE ex_id = ${exam_ID}`;
        const crs_id = examData.recordset[0].crs_id;

        // 4. Check Grade
        const gradeData = await sql.query`
            SELECT grade 
            FROM st_crs_grade 
            WHERE st_id = ${student_ID} AND crs_id = ${crs_id}
        `;

        if (gradeData.recordset.length > 0) {
            console.log("Grade in DB:", gradeData.recordset[0].grade);
        } else {
            console.log("❌ No grade record found!");
        }

    } catch (err) {
        console.error("Verification Error:", err.message);
    }
    process.exit(0);
}

verifyFix();
