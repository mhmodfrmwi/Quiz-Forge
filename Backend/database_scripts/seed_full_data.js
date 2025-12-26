const { sql, connectDB } = require("./src/config/dbConfig");

async function seedFullData() {
    await connectDB();
    try {
        console.log("🚀 Starting Full Seeding...");

        // 1. Ensure Instructor (ID 101) exists (Already checked, assuming yes)
        
        // 2. Ensure Student (ID 1) exists
        // (Already checked)

        // 3. Create Course
        console.log("Inserting Course...");
        const crsResult = await sql.query`
            INSERT INTO Course (crs_name, crs_duration) 
            VALUES ('Advanced SQL', 60);
            SELECT SCOPE_IDENTITY() AS id;
        `;
        const crsId = crsResult.recordset[0].id;
        console.log(`✅ Course Created: ID ${crsId}`);

        // 4. Create Topic
        console.log("Inserting Topic...");
        await sql.query`
            INSERT INTO Topic (topic_name, crs_id)
            VALUES ('Stored Procedures', ${crsId});
        `;
        // We need topic_id. 
        const topResult = await sql.query`SELECT TOP 1 topic_id FROM Topic WHERE crs_id = ${crsId}`;
        const topId = topResult.recordset[0].topic_id;
        console.log(`✅ Topic Created: ID ${topId}`);

        // 5. Enroll Student 1 in Course
        console.log("Enrolling Student...");
        await sql.query`
            INSERT INTO st_crs_grade (st_id, crs_id)
            VALUES (1, ${crsId});
        `;
        console.log(`✅ Student 1 Enrolled in Course ${crsId}`);

        // 6. Create Questions (5 MCQ, 5 TF)
        console.log("Inserting Questions...");
        for (let i = 1; i <= 5; i++) {
            // MCQ
            let qRes = await sql.query`
                INSERT INTO Question (q_text, q_type, default_score, correct_choice, crs_id, top_id)
                VALUES (${'MCQ Question ' + i}, 'MCQ', 10, 'A', ${crsId}, ${topId});
                SELECT SCOPE_IDENTITY() AS id;
            `;
            let qId = qRes.recordset[0].id;
            
            // Choices
            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Choice A', ${qId})`;
            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Choice B', ${qId})`;
            
            // TF
            await sql.query`
                INSERT INTO Question (q_text, q_type, default_score, correct_choice, crs_id, top_id)
                VALUES (${'TF Question ' + i}, 'TF', 5, 'T', ${crsId}, ${topId});
            `;
        }
        console.log("✅ 10 Questions Inserted");

        // 7. Create Exam (Draft)
        console.log("Creating Exam...");
        const exResult = await sql.query`
            INSERT INTO Exam (duration, total_score, crs_id, ins_id)
            VALUES (60, 100, ${crsId}, 101);
            SELECT SCOPE_IDENTITY() AS id;
        `;
        const exId = exResult.recordset[0].id;
        console.log(`✅ Exam Created: ID ${exId}`);

        console.log("\n🎉 SEEDING COMPLETE! USE THESE IDs:");
        console.log({
            Student_ID: 1,
            Instructor_ID: 101,
            Course_ID: crsId,
            Topic_ID: topId,
            Exam_ID: exId
        });

    } catch (err) {
        console.error("❌ Error seeding data:", err.message);
    }
    process.exit(0);
}

seedFullData();
