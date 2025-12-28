const { sql, connectDB } = require("../src/config/dbConfig");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const FIRST_NAMES = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Hank"];
const LAST_NAMES = ["Smith", "Doe", "Johnson", "Brown", "Williams", "Jones", "Miller", "Davis", "Garcia", "Rodriguez"];
const CITIES = ["Cairo", "Alexandria", "Giza", "Luxor", "Aswan"];
const DEGREES = ["PhD", "Master", "Bachelor"];
const COURSES = [
    { name: "Intro to Python", duration: 40 },
    { name: "Advanced Java", duration: 60 },
    { name: "Web Development", duration: 50 },
    { name: "Machine Learning", duration: 80 },
    { name: "Database Engineering", duration: 45 }
];

async function seedExpandedData() {
    await connectDB();
    try {
        console.log("🚀 Starting Expanded Seeding...");

        let studentIds = [];
        let instructorIds = [];
        let courseIds = [];
        let topicIds = [];

        // 1. Insert Instructors
        console.log("\n--- Seeding Instructors ---");
        for (let i = 0; i < 5; i++) {
            try {
                const name = `${getRandomItem(FIRST_NAMES)} ${getRandomItem(LAST_NAMES)}`;
                const email = `ins.${name.replace(' ', '.').toLowerCase()}@test.com`;
                const deptId = getRandomInt(1, 10);
                
                const res = await sql.query`
                    INSERT INTO Instructor (ins_name, degree, salary, Dept_id, ins_email, ins_password)
                    VALUES (${name}, ${getRandomItem(DEGREES)}, ${getRandomInt(5000, 15000)}, ${deptId}, ${email}, '123');
                    SELECT SCOPE_IDENTITY() AS id;
                `;
                if (res.recordset[0].id) {
                     instructorIds.push(res.recordset[0].id);
                     console.log(`✅ Instructor Created: ${name} (ID: ${res.recordset[0].id})`);
                }
            } catch (err) {
                console.log(`⚠️ Failed to insert instructor: ${err.message}`);
            }
        }

        // 2. Insert Students
        console.log("\n--- Seeding Students ---");
        for (let i = 0; i < 10; i++) {
            try {
                const name = `${getRandomItem(FIRST_NAMES)} ${getRandomItem(LAST_NAMES)}`;
                const email = `std.${name.replace(' ', '.').toLowerCase()}@test.com`;
                const deptId = getRandomInt(1, 10);
                
                // Assuming Univ_id, Major_id can be NULL or we skip them. based on inspection they are int.
                // We'll try NULL first.
                const res = await sql.query`
                    INSERT INTO Student (st_name, st_address, Dept_id, st_email, st_password, DateOfBirth)
                    VALUES (${name}, ${getRandomItem(CITIES)}, ${deptId}, ${email}, '123', '2000-01-01');
                    SELECT SCOPE_IDENTITY() AS id;
                `;
                 if (res.recordset[0].id) {
                     studentIds.push(res.recordset[0].id);
                     console.log(`✅ Student Created: ${name} (ID: ${res.recordset[0].id})`);
                }
            } catch (err) {
                console.log(`⚠️ Failed to insert student: ${err.message}`);
            }
        }

        // 3. Insert Courses
        console.log("\n--- Seeding Courses ---");
        for (const c of COURSES) {
            try {
                const res = await sql.query`
                    INSERT INTO Course (crs_name, crs_duration)
                    VALUES (${c.name}, ${c.duration});
                    SELECT SCOPE_IDENTITY() AS id;
                `;
                const crsId = res.recordset[0].id;
                courseIds.push({ id: crsId, name: c.name });
                console.log(`✅ Course Created: ${c.name} (ID: ${crsId})`);

                // 4. Insert Topics for this Course
                for (let t = 1; t <= 3; t++) {
                     const topName = `${c.name} - Topic ${t}`;
                     const topRes = await sql.query`
                        INSERT INTO Topic (topic_name, crs_id)
                        VALUES (${topName}, ${crsId});
                        SELECT SCOPE_IDENTITY() AS id;
                    `;
                    const topId = topRes.recordset[0].id;
                    topicIds.push(topId);

                    // 5. Insert Questions for this Topic
                    // 5 MCQ, 5 TF
                    for (let q = 1; q <= 10; q++) {
                        const isMCQ = q <= 5;
                        const qType = isMCQ ? 'MCQ' : 'TF';
                        const qText = `${qType} Question ${q} for ${topName}`;
                        const correct = isMCQ ? 'A' : 'T';
                        const score = isMCQ ? 5 : 2;

                        const qRes = await sql.query`
                            INSERT INTO Question (q_text, q_type, default_score, correct_choice, crs_id, top_id)
                            VALUES (${qText}, ${qType}, ${score}, ${correct}, ${crsId}, ${topId});
                            SELECT SCOPE_IDENTITY() AS id;
                        `;
                        const qId = qRes.recordset[0].id;

                        // 6. Insert Choices
                        if (isMCQ) {
                            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option A', ${qId})`;
                            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option B', ${qId})`;
                            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option C', ${qId})`;
                            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('Option D', ${qId})`;
                        } else {
                            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('True', ${qId})`;
                            await sql.query`INSERT INTO Choice (choice_text, q_id) VALUES ('False', ${qId})`;
                        }
                    }
                }
                console.log(`   ✅ Added 3 Topics and 30 Questions for ${c.name}`);

            } catch (err) {
                 console.log(`⚠️ Failed to insert course ${c.name}: ${err.message}`);
            }
        }

        // 7. Enroll Students in Courses
        console.log("\n--- Enrolling Students ---");
        if (courseIds.length > 0 && studentIds.length > 0) {
            for (const stId of studentIds) {
                // Enroll in 2 random courses
                const enrolled = new Set();
                for (let k = 0; k < 2; k++) {
                    const crs = getRandomItem(courseIds);
                    if (!enrolled.has(crs.id)) {
                        try {
                            await sql.query`
                                INSERT INTO st_crs_grade (st_id, crs_id)
                                VALUES (${stId}, ${crs.id})
                            `;
                             console.log(`✅ Student ${stId} enrolled in ${crs.name}`);
                             enrolled.add(crs.id);
                        } catch (err) {
                            // Ignore duplicates or errors
                        }
                    }
                }
            }
        }

        // 8. Create Exams
        console.log("\n--- Creating Exams ---");
        if (courseIds.length > 0 && instructorIds.length > 0) {
            for (const crs of courseIds) {
                 try {
                     const insId = getRandomItem(instructorIds);
                     await sql.query`
                        INSERT INTO Exam (duration, total_score, crs_id, ins_id, is_submitted)
                        VALUES (60, 100, ${crs.id}, ${insId}, 0)
                     `;
                     console.log(`✅ Exam created for ${crs.name} by Inst ${insId}`);
                 } catch (err) {
                      console.log(`⚠️ Failed to create exam: ${err.message}`);
                 }
            }
        }

        console.log("\n🎉 EXPANDED SEEDING COMPLETE!");

    } catch (err) {
        console.error("❌ Global Error in Seeding:", err.message);
    }
    process.exit(0);
}

seedExpandedData();
