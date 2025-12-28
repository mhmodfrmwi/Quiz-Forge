import { useEffect, useState } from "react";
import axios from "axios";
import InstructorSidebar from "../component/InstructorSidebar";

const ExamGenerator = () => {
  const instructor = JSON.parse(localStorage.getItem("user"));
  const instructorId = instructor?.id;

  const apiUrl = import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState([]);
  const [examId, setExamId] = useState(null);
  const [generatedExam, setGeneratedExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [config, setConfig] = useState({
    courseId: "",
    duration: 60,
    mcqCount: 0,
    tfCount: 0,
  });

  //  Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${apiUrl}/courses`);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  //  Create/Generate Exam
  const handleGenerate = async () => {
    if (!config.courseId) {
      setError("Please select a course");
      return;
    }
    try {
      setError("");
      setLoading(true);
      let currentExamId = examId;

      //  Create exam if not exist
      if (!currentExamId) {
        const createRes = await axios.post(`${apiUrl}/exams`, {
          dur: config.duration,
          total: 100,
          crs_id: config.courseId,
          ins_id: instructorId,
        });
        currentExamId = createRes.data.ex_id;
        setExamId(currentExamId);
      }

      //  Generate questions
      const generateRes = await axios.post(`${apiUrl}/exams/generate`, {
        ex_id: currentExamId,
        mcq_cnt: config.mcqCount,
        tf_cnt: config.tfCount,
        mode: "random",
      });

      setGeneratedExam(generateRes.data);
    } catch (err) {
      setError("Failed to generate exam");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //  Replace specific question
  const handleReplaceQuestion = async (q_id, q_type) => {
    try {
      setLoading(true);
      const replaceRes = await axios.post(`${apiUrl}/exams/generate`, {
        ex_id: examId,
        mcq_cnt: q_type.toLowerCase() === "mcq" ? 1 : 0,
        tf_cnt: q_type.toLowerCase() === "tf" ? 1 : 0,
        mode: "random",
      });

      //  Remove old question & add new one
      const newQuestion = replaceRes.data.questions[0];
      const updatedQuestions = generatedExam.questions
        .filter((q) => q.q_id !== q_id)
        .concat(newQuestion);
      setGeneratedExam({ ...generatedExam, questions: updatedQuestions });
    } catch (err) {
      console.error("Failed to replace question", err);
    } finally {
      setLoading(false);
    }
  };

  //  Submit Exam
  const handleSubmit = async () => {
    if (!examId) return;
    try {
      await axios.post(`${apiUrl}/exams/submit`, { ex_id: examId });
      alert("Exam submitted successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to submit exam");
    }
  };

  return (
      <div className="flex min-h-screen bg-slate-50">
      <InstructorSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="flex-1 p-4 lg:p-10 w-full">
        <header className="flex justify-between items-center mb-6 lg:mb-10">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4 p-2 rounded-lg bg-purple-50 text-purple-600"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
                Generate Exam
              </h1>
             
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">
              Instructor
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>  <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Course */}
        <label className="text-left block mb-2 font-medium">Select Course:</label>
       
        <select
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setConfig({ ...config, courseId: e.target.value })}
          value={config.courseId}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c.crs_id} value={c.crs_id}>
              {c.crs_name}
            </option>
          ))}
        </select>

        {/* Duration */}
        <label className="text-left block mb-2 font-medium">Duration (minutes):</label>
       
        <input
          type="number"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Duration (minutes)"
          value={config.duration}
          onChange={(e) => setConfig({ ...config, duration: +e.target.value })}
        />

        {/* MCQ Count */}
        <label className="text-left block mb-2 font-medium">Number of MCQs Questions:</label>
        <input
          type="number"
          className="w-full mb-4 p-2 border rounded"
          placeholder="MCQ Count"
          value={config.mcqCount}
          onChange={(e) => setConfig({ ...config, mcqCount: +e.target.value })}
        />

        {/* TF Count */}
        <label className="text-left block mb-2 font-medium">Number of True/False Questions:</label>
       
        <input
          type="number"
          className="w-full mb-6 p-2 border rounded"
          placeholder="True / False Count"
          value={config.tfCount}
          onChange={(e) => setConfig({ ...config, tfCount: +e.target.value })}
        />

        {/* Buttons */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mb-3 bg-indigo-600 text-white py-2 rounded"
        >
          {examId ? "Regenerate Exam" : "Generate Exam"}
        </button>

        {generatedExam && (
          <>
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-500 mt-6">
              <h3 className="text-xl font-bold mb-4">Exam Questions</h3>

              {(() => {
                const grouped = {};
                generatedExam.questions.forEach((q) => {
                  if (!grouped[q.q_id]) grouped[q.q_id] = { ...q, choices: [] };
                  if (q.choice_text) grouped[q.q_id].choices.push(q.choice_text);
                });
                return Object.values(grouped).map((q, idx) => (
                  <div key={q.q_id} className="mb-4 p-4 border rounded bg-gray-50">
                    <p className="font-semibold">
                      {idx + 1}. {q.q_text} ({q.q_type.toUpperCase()}, Degree: {q.degree})
                    </p>
                    {q.q_type.toLowerCase() === "mcq" && q.choices.length > 0 && (
                      <ul className="list-disc list-inside mt-2 text-gray-700">
                        {q.choices.map((choice, i) => (
                          <li key={i}>{choice}</li>
                        ))}
                      </ul>
                    )}
                    {q.q_type.toLowerCase() === "tf" && (
                      <p className="mt-2 text-gray-700">Options: True / False</p>
                    )}
                    <button
                      className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleReplaceQuestion(q.q_id, q.q_type)}
                    >
                      Replace Question
                    </button>
                  </div>
                ));
              })()}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
              Submit Exam
            </button>
          </>
        )}
      </div>
      </main>
    </div>
  );
};

export default ExamGenerator;
