const { sql, connectDB } = require("./src/config/dbConfig");

async function seedUsers() {
    await connectDB();
    try {
        console.log("Seeding users...");

        // Update Student 1
        await sql.query`
            UPDATE Student 
            SET st_email = 'student@test.com', st_password = '123' 
            WHERE st_id = 1;
        `;
        console.log("✅ Student 1 updated: student@test.com / 123");

        // Update Instructor 101
        await sql.query`
            UPDATE Instructor 
            SET ins_email = 'ins@test.com', ins_password = '123' 
            WHERE ins_id = 101;
        `;
        console.log("✅ Instructor 101 updated: ins@test.com / 123");

    } catch (err) {
        console.error("❌ Error seeding users:", err.message);
    }
    process.exit(0);
}

seedUsers();
