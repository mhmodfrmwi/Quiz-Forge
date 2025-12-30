const { sql, connectDB } = require("../src/config/dbConfig");

async function fixStudentReport() {
    await connectDB();
    try {
        await sql.query`
            CREATE OR ALTER PROC SP_Student_Grades
                @St_id int
            AS
            BEGIN
                SET NOCOUNT ON;

                SELECT 
                    c.crs_name,
                    c.crs_id,
                    sc.grade,
                    CASE 
                        WHEN sc.grade >= 60 THEN 'Pass'
                        ELSE 'Fail'
                    END as status
                FROM st_crs_grade sc
                JOIN Course c ON sc.crs_id = c.crs_id
                WHERE sc.st_id = @St_id;
            END
        `;
        console.log("✅ Successfully updated SP_Student_Grades");
    } catch (err) {
        console.error("❌ Error updating SP_Student_Grades:", err.message);
    }
    process.exit(0);
}

fixStudentReport();
