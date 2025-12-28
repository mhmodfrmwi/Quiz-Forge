import axios from "axios";
import { useState, useEffect } from "react";
import InstructorSidebar from "../component/InstructorSidebar";
import { Link } from "react-router-dom";

const QuestionBank = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

 
  const fetchQuestions = () => {
    setLoading(true);
    axios.get(`${apiUrl}/questions`)
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load questions. Please try again.");
        setLoading(false);
        console.error(err);
      });
  };
 useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      axios.delete(`${apiUrl}/questions/${questionId}`)
        .then(() => {
          setQuestions(questions.filter(q => q.q_id !== questionId));
          alert("Question deleted successfully!");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete question. Please try again.");
        });
    }
  };

  const handleUpdateQuestion = (question) => {
     alert(`Edit question with ID: ${question.q_id}`);
    
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "multiple_choice": return "bg-blue-100 text-blue-800";
      case "true_false": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatQuestionType = (type) => {
    return type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
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
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
                Question Bank
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Total Questions: {questions.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">Instructor</span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-slate-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg lg:text-xl font-bold text-slate-800">
                All Questions
              </h2>
              <Link to="/add-question" 
                 className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Question
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="p-10 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-slate-600">Loading questions...</p>
            </div>
          ) : error ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-600 font-medium mb-2">{error}</p>
              <button 
                onClick={fetchQuestions}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : questions.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-600 font-medium mb-2">No questions found</p>
              <p className="text-slate-500 mb-4">Start by adding your first question</p>
              <button 
                onClick={() => alert("Add new question functionality")}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Create First Question
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {questions.map((q) => (
                <div key={q.q_id} className="p-4 lg:p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start gap-2 mb-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(q.q_type)}`}>
                          {formatQuestionType(q.q_type)}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                          ID: {q.q_id}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium">
                          {q.default_score} points
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">{q.q_text}</h3>
                      
                      
                      {/* Display correct answer for all question types */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Correct Answer: <strong>{q.correct_choice}</strong></span>
                        </div>
                        
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex lg:flex-col gap-2 pt-2 lg:pt-0">
                      <button 
                        onClick={() => handleUpdateQuestion(q)}
                        className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Edit Question"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteQuestion(q.q_id)}
                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Question"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuestionBank;