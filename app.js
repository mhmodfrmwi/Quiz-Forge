const express = require("express");
const { connectDB } = require("./src/config/dbConfig");

const app = express();
const PORT = 3000;

const authRoutes = require("./src/routes/authRoutes");

connectDB();
app.use(express.json());
app.use(require("cors")());

app.use("/api/auth", authRoutes);
app.use("/api/questions", require("./src/routes/questionRoutes"));
app.use("/api/exams", require("./src/routes/examRoutes"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
