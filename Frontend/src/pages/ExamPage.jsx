import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ExamPage = () => {
  const { id } = useParams(); // examId
  const apiUrl = import.meta.env.VITE_API_URL;

  const user = JSON.parse(localStorage.getItem("user"));

  const studentId = user?.id;
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(() => {
    return parseInt(localStorage.getItem("currentIndex")) || 0;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("userAnswers")) || {};
  });

  const [shuffledOptions, setShuffledOptions] = useState([]);

  const currentQ = questions[currentIndex];

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${apiUrl}/student/exam/${id}/questions`, {
          params: { studentId },
        });
        setExam(res.data);
        setQuestions(res.data.questions);
         const endTime =
        new Date(res.data.serverTime).getTime() +
        res.data.durationMinutes *60* 1000;

 
      const now = new Date().getTime();

      const remainingSeconds = Math.max(
        Math.floor((endTime - now) / 1000),
        0
      );

      setTimeLeft(remainingSeconds);
      } catch (err) {
        console.error("Error fetching exam:", err);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleSubmit = async () => {
    if (!studentId) {
      alert("Student not logged in");
      return;
    }
    try {
      const answers = Object.entries(userAnswers).map(([q_id, answer]) => ({
        q_id: Number(q_id),
        answer,
      }));

      await axios.post(`${apiUrl}/student/exam/submit`, {
        examId: Number(id),
        studentId: Number(studentId),
        answers: [...answers],
      });

      localStorage.removeItem("currentIndex");
      localStorage.removeItem("userAnswers");

      alert("Exam submitted successfully");
      navigate("/my-exams");
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  /* ================= TIMER ================= */

  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ================= OPTIONS SHUFFLE ================= */
  useEffect(() => {
    if (!currentQ) return;

    let options =
      currentQ.type === "tf" ? ["True", "False"] : [...currentQ.choices];

    options.sort(() => Math.random() - 0.5);
    setShuffledOptions(options);
  }, [currentIndex, currentQ]);

  /* ================= LOCAL STORAGE ================= */
  useEffect(() => {
    localStorage.setItem("currentIndex", currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  }, [userAnswers]);

  /* ================= HANDLERS ================= */
  const handleSelect = (answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.q_id]: answer,
    }));
  };

  if (!currentQ) return <h2 className="text-center mt-10">Loading...</h2>;
console.log(exam);
  /* ================= UI ================= */
  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <header className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center justify-between">
        <div className="w-3/4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <div
          className={`px-4 py-2 rounded-lg font-bold ${
            timeLeft < 60
              ? "bg-red-100 text-red-600 animate-pulse"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
      </header>

      <main className="bg-white rounded-2xl shadow p-10 max-w-3xl mx-auto">
        <span className="inline-block mb-4 px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full font-semibold">
          Question {currentIndex + 1}
        </span>

        <h2 className="text-2xl font-semibold mb-8">{currentQ.text}</h2>

        <div className="grid gap-4">
          {shuffledOptions.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt)}
              className={`flex items-center gap-4 p-4 border-2 rounded-xl transition
                ${
                  userAnswers[currentQ.q_id] === opt
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "border-slate-200 hover:border-indigo-600 hover:bg-indigo-50"
                }`}
            >
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-10">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((p) => p - 1)}
            className="px-6 py-3 rounded-lg bg-slate-200 disabled:opacity-50"
          >
            Previous
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((p) => p + 1)}
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-lg bg-green-600 text-white"
            >
              Submit Exam
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExamPage;
