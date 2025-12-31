import { useEffect, useState } from "react";
import axios from "axios";
import InstructorSidebar from "../component/InstructorSidebar";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [config, setConfig] = useState({
    courseId: "",
    duration: 60,
    mcqCount: 0,
    tfCount: 0,
  });

  // Fetch courses
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

  // Generate Exam (first time)
  const handleGenerate = async () => {
    if (!config.courseId) {
      setError("Please select a course");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const mcqCount = Math.max(0, parseInt(config.mcqCount) || 0);
      const tfCount = Math.max(0, parseInt(config.tfCount) || 0);
      const duration = Math.max(1, parseInt(config.duration) || 60);

      const createRes = await axios.post(`${apiUrl}/exams`, {
        dur: duration,
        total: (mcqCount + tfCount) * 10,
        crs_id: config.courseId,
        ins_id: instructorId,
      });
      const newExamId = createRes.data.ex_id;
      setExamId(newExamId);

      if (mcqCount > 0 || tfCount > 0) {
        const generateRes = await axios.post(`${apiUrl}/exams/generate`, {
          ex_id: newExamId,
          mcq_cnt: mcqCount,
          tf_cnt: tfCount,
          mode: "random",
        });
        setGeneratedExam(generateRes.data);
      }
    } catch (err) {
      setError("Failed to generate exam");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update Exam Info
  const handleUpdateExam = async () => {
    if (!examId) return;
    try {
      setLoading(true);
      const mcqCount = Math.max(0, parseInt(config.mcqCount) || 0);
      const tfCount = Math.max(0, parseInt(config.tfCount) || 0);
      const duration = Math.max(1, parseInt(config.duration) || 60);

      await axios.put(`${apiUrl}/exams/${examId}`, {
        dur: duration,
        total: (mcqCount + tfCount) * 10,
        crs_id: config.courseId,
      });
      alert("Exam info updated successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to update exam");
    } finally {
      setLoading(false);
    }
  };

  // Regenerate Questions
  const handleRegenerateQuestions = async () => {
    if (!examId) return;
    try {
      setLoading(true);
      const mcqCount = Math.max(0, parseInt(config.mcqCount) || 0);
      const tfCount = Math.max(0, parseInt(config.tfCount) || 0);

      const generateRes = await axios.post(`${apiUrl}/exams/generate`, {
        ex_id: examId,
        mcq_cnt: mcqCount,
        tf_cnt: tfCount,
        mode: "random",
      });
      setGeneratedExam(generateRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to regenerate questions");
    } finally {
      setLoading(false);
    }
  };

  // Submit Exam
  const handleSubmit = async () => {
    if (!examId) return;
    try {
      await axios.post(`${apiUrl}/exams/submit`, { ex_id: examId });
      alert("Exam submitted successfully");
      navigate("/instructor-exams");
    } catch (err) {
      console.error(err);
      setError("Failed to submit exam");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <InstructorSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 lg:p-10 w-full">
        <header className="flex justify-between items-center mb-6 lg:mb-10">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4 p-2 rounded-lg bg-purple-50 text-purple-600"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">Generate Exam</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">Instructor</span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
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
              <option key={c.crs_id} value={c.crs_id}>{c.crs_name}</option>
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
            onChange={(e) => setConfig({ ...config, mcqCount: Number(e.target.value) })}
          />

          {/* TF Count */}
          <label className="text-left block mb-2 font-medium">Number of True/False Questions:</label>
          <input
            type="number"
            className="w-full mb-6 p-2 border rounded"
            placeholder="True / False Count"
            value={config.tfCount}
            onChange={(e) => setConfig({ ...config, tfCount: Number(e.target.value) })}
          />

          {/* Buttons */}
          {!examId && (
            <button onClick={handleGenerate} disabled={loading} className="w-full mb-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
              Generate Exam
            </button>
          )}

          {examId && (
            <>
              <button onClick={handleUpdateExam} disabled={loading} className="w-full mb-3 bg-purple-400 hover:bg-purple-500 text-white py-2 rounded">
                Update Exam Info
              </button>
              <button onClick={handleRegenerateQuestions} disabled={loading} className="w-full mb-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
                Regenerate Questions
              </button>
            </>
          )}

          {generatedExam && (
            <>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 mt-6">
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
                          {q.choices.map((choice, i) => <li key={i}>{choice}</li>)}
                        </ul>
                      )}
                      {q.q_type.toLowerCase() === "tf" && <p className="mt-2 text-gray-700">Options: True / False</p>}
                    </div>
                  ));
                })()}
              </div>

              <button onClick={handleSubmit} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded mt-4">
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
