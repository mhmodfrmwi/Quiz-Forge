import { useEffect, useState } from "react";
import InstructorSidebar from "../component/InstructorSidebar";
import axios from "axios";

const AddQuestion = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [topic, setTopic] = useState([]);

  const [questionData, setQuestionData] = useState({
    q_text: "",
    q_type: "mcq",
    correct_choice: "",
    wrong_choices: [""],
    crs_id: courses.length > 0 ? courses[0].crs_id : 1,
    score: 5,
    top_id: topic.length > 0 ? topic[0].top_id : 1,
  });

  const questionTypes = [
    { value: "mcq", label: "Multiple Choice (MCQ)" },
    { value: "tf", label: "True / False" },
  ];

  const handleWrongChoiceChange = (index, value) => {
    const newWrongChoices = [...questionData.wrong_choices];
    newWrongChoices[index] = value;
    setQuestionData({ ...questionData, wrong_choices: newWrongChoices });
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionPayload = {
        text: questionData.q_text,
        type: questionData.q_type.toUpperCase(),
        score: questionData.score,
        correct: questionData.correct_choice,
        crs_id: parseInt(questionData.crs_id),
        top_id: parseInt(questionData.top_id),
      };

      const response = await axios.post(`${apiUrl}/questions`, questionPayload);
      const savedQuestion = response.data;

      if (questionData.q_type === "mcq") {
        const choicesPayload = [
          ...questionData.wrong_choices.map((choice) => ({
            text: choice,
            q_id: savedQuestion.q_id,
          })),
          {
            text: questionData.correct_choice,
            q_id: savedQuestion.q_id,
            is_correct: true,
          },
        ];

        for (const choice of choicesPayload) {
          await axios.post(`${apiUrl}/questions/choices`, choice);
        }
      }

      setQuestions([...questions, savedQuestion]);
      setSavedQuestions([...savedQuestions, savedQuestion]);
      alert("Question and choices saved successfully!");

      setQuestionData({
        q_text: "",
        q_type: "mcq",
        correct_choice: "",
        wrong_choices: [""],
        crs_id: courses.length > 0 ? courses[0].crs_id : 1,
        score: 5,
        top_id: topic.length > 0 ? topic[0].top_id : 1,
      });
    } catch (err) {
      console.error("Error adding question or choices:", err);
      alert("Failed to save question. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/courses`);
        setCourses(response.data);

        if (response.data.length > 0) {
          setQuestionData((prev) => ({
            ...prev,
            crs_id: response.data[0].crs_id,
          }));
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);
  const addWrongChoice = () => {
    setQuestionData({
      ...questionData,
      wrong_choices: [...questionData.wrong_choices, ""],
    });
  };
  const removeWrongChoice = (index) => {
    const updatedChoices = questionData.wrong_choices.filter(
      (_, i) => i !== index
    );
    setQuestionData({
      ...questionData,
      wrong_choices: updatedChoices,
    });
  };

  useEffect(() => {
    if (!questionData.crs_id) return;
    const fetchTopics = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/courses/${questionData.crs_id}/topics`
        );
        setTopic(response.data);
        if (response.data.length > 0) {
          setQuestionData((prev) => ({
            ...prev,
            top_id: response.data[0].topic_id,
          }));
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchTopics();
  }, [questionData.crs_id]);
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
                Add Question
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">
              Instructor
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-8 border-b pb-4">
            Add New Question
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course & Question Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Course
                </label>
                <select
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
                  value={questionData.crs_id}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      crs_id: parseInt(e.target.value),
                    })
                  }
                >
                  {courses.map((course) => (
                    <option key={course.crs_id} value={course.crs_id}>
                      {course.crs_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Topic
                </label>
                <select
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
                  value={questionData.top_id}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      top_id: parseInt(e.target.value),
                    })
                  }
                >
                  {topic.map((top) => (
                    <option key={top.topic_id} value={top.topic_id}>
                      {top.topic_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Question Type
                </label>
                <select
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
                  value={questionData.q_type}
                  onChange={(e) =>
                    setQuestionData({ ...questionData, q_type: e.target.value })
                  }
                >
                  {questionTypes.map((type, idx) => (
                    <option key={idx} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Question Text
              </label>
              <textarea
                required
                className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none h-24"
                placeholder="Enter the question here..."
                value={questionData.q_text}
                onChange={(e) =>
                  setQuestionData({ ...questionData, q_text: e.target.value })
                }
              />
            </div>

            {/* Score */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Score
              </label>
              <input
                required
                type="number"
                className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none mb-4"
                placeholder="Enter the question score"
                value={questionData.score}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    score: parseInt(e.target.value),
                  })
                }
              />
            </div>

            {/* Correct Answer */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Correct Answer
              </label>
              {questionData.q_type === "tf" ? (
                <div className="flex gap-4">
                  {["True", "False"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        setQuestionData({
                          ...questionData,
                          correct_choice: option,
                        })
                      }
                      className={`px-6 py-2 rounded-lg font-bold border-2 transition ${
                        questionData.correct_choice === option
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white border-slate-200 text-slate-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  required
                  type="text"
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none"
                  placeholder="Enter the correct answer"
                  value={questionData.correct_choice}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      correct_choice: e.target.value,
                    })
                  }
                />
              )}
            </div>

            {/* Wrong Choices */}
            {questionData.q_type === "mcq" && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                <label className="block text-sm font-semibold text-red-500">
                  Wrong Choices
                </label>

                {questionData.wrong_choices.map((choice, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      required
                      type="text"
                      className="flex-1 p-3 border-2 border-slate-200 rounded-xl focus:border-red-300 outline-none"
                      placeholder={`Wrong choice ${index + 1}`}
                      value={choice}
                      onChange={(e) =>
                        handleWrongChoiceChange(index, e.target.value)
                      }
                    />

                    {questionData.wrong_choices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWrongChoice(index)}
                        className="px-2 py-2 rounded-xl  "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="red"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addWrongChoice}
                  className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-xl font-semibold"
                >
                  + Add Wrong Choice
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg transition-all transform hover:scale-[1.01]"
            >
              Save Question to Bank
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddQuestion;
