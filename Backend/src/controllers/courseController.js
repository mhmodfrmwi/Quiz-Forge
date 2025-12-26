const { sql } = require("../config/dbConfig");

const assignStudentToCourse = async (req, res) => {
    const { st_id, crs_id } = req.body;
    try {
        const request = new sql.Request();
        request.input("st_id", sql.Int, st_id);
        request.input("crs_id", sql.Int, crs_id);
        
        // Using generic insert if no explicit assignment SP exists
        // Checking if Student_Course table exists (it does from schema check)
        // Table: Student_Course (st_id, crs_id, grade?)
        
        // Table: st_crs_grade (st_id, crs_id, grade)
        // Using MERGE to avoid duplicates
        await request.query(`
            MERGE st_crs_grade AS target
            USING (SELECT @st_id, @crs_id) AS source (st_id, crs_id)
            ON (target.st_id = source.st_id AND target.crs_id = source.crs_id)
            WHEN NOT MATCHED THEN
                INSERT (st_id, crs_id) VALUES (source.st_id, source.crs_id);
        `);
        
        res.json({ message: "Student assigned to course successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query("SELECT * FROM Course");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getCourseTopics = async (req, res) => {
    const { id } = req.params;
    try {
        const request = new sql.Request();
        request.input("id", sql.Int, id);
        const result = await request.query("SELECT * FROM Topic WHERE crs_id = @id");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    assignStudentToCourse,
    getAllCourses,
    getCourseTopics
};
