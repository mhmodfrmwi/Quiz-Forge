import { useEffect, useState } from "react";
import userImage from "../assets/user.png";
import StudentSidebar from "../component/StudentSidebar";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const StudentExams = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = import.meta.env.VITE_API_URL;
  const [exams, setExams] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState(null);
    const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch exams
        const examsResponse = await axios.get(
          `${apiUrl}/student/course/${courseId}/exams`
        );
        setExams(examsResponse.data);

        // Fetch topics
        const topicsResponse = await axios.get(
          `${apiUrl}/courses/${courseId}/topics`
        );
        setTopics(topicsResponse.data);

        // Fetch course info if available
        const courseResponse = await axios.get(
          `${apiUrl}/courses/${courseId}`
        );
        setCourseInfo(courseResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [courseId, apiUrl]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Calculate exam status
  // const getExamStatus = (exam) => {
  //   // You can add logic here based on exam date, completion status, etc.
  //   return "Upcoming"; // Default status
  // };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Upcoming": return "bg-amber-100 text-amber-800";
      case "Overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Format duration from minutes to hours/minutes
  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
  };
const sortedExams = [...exams].sort(
  (a, b) => b.ex_id - a.ex_id
);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <StudentSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

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
                {courseInfo ? courseInfo.course_name : "My Exams"}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage and track your exams in this course
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">
              {user?.fullname || "Student"}
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm overflow-hidden">
              <img
                src={userImage}
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white bg-gradient-to-r from-purple-600 to-indigo-500 shadow-2xl shadow-purple-200 mb-8">
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-2">
              Welcome to {courseInfo?.course_name || "Course"} Exams
            </h2>
            <p className="text-white/80 text-base lg:text-lg mb-4">
              You have {exams.length} exam{exams.length !== 1 ? 's' : ''} to complete in this course. 
              Prepare yourself and ace them all!
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{topics.length} Topics Covered</span>
              </div>
              <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Total Score: {exams.reduce((sum, exam) => sum + (exam.total_score || 0), 0)} points</span>
              </div>
            </div>
          </div>
          <img 
            src="https://illustrations.popsy.co/amber/examination.svg" 
            alt="exam illustration" 
            className="absolute right-0 bottom-0 w-40 h-40 lg:w-60 lg:h-60 opacity-90 hidden lg:block"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-slate-600">Loading exams and course content...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Exams Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Available Exams</h2>
                <div className="text-sm text-slate-500">
                  {exams.length} exam{exams.length !== 1 ? 's' : ''} found
                </div>
              </div>

              {exams.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">No Exams Available</h3>
                  <p className="text-slate-600 mb-6">There are currently no exams scheduled for this course.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedExams.map((exam) => {
                    // const status = getExamStatus(exam);
                    return (
                      <div
                        key={exam.ex_id}
                        onClick={() => navigate(`/exam/${exam.ex_id}`, { state: { duration: exam.duration } })}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-slate-800">Exam #{exam.ex_id}</h3>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-1 ${getStatusColor(status)}`}>
                                  {/* {status} */}
                                </div>
                              </div>
                            </div>
                            <p className="text-slate-600 mb-1">{exam.exam_description || "Complete this exam to test your knowledge"}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-xs text-slate-500 mb-1">Duration</p>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <p className="font-semibold text-slate-800">{formatDuration(exam.duration || 60)}</p>
                            </div>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl">
                            <p className="text-xs text-slate-500 mb-1">Total Score</p>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              <p className="font-semibold text-slate-800">{exam.total_score || 100} points</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-slate-500">
                            {exam.question_count ? `${exam.question_count} questions` : "Multiple questions"}
                          </div>
                          <Link
                            to={`/exam/${exam.ex_id}`}
                            className="bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-sm hover:shadow-md"
                          >
                            Start Exam
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Course Topics Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Course Topics</h2>
                <div className="text-sm text-slate-500">
                  {topics.length} topic{topics.length !== 1 ? 's' : ''} covered
                </div>
              </div>

              {topics.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="text-slate-600">No topics available for this course.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic, index) => (
                    <div
                      key={topic.topic_id}
                      className="group p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <span className="font-bold text-purple-700">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-1">{topic.topic_name}</h3>
                          {topic.topic_description && (
                            <p className="text-sm text-slate-600 line-clamp-2">{topic.topic_description}</p>
                          )}
                        </div>
                      </div>
                      {topic.resource_count > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs text-slate-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{topic.resource_count} resources</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Exam Preparation Tips</h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Review all course topics before attempting exams</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Manage your time effectively during the exam</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Read each question carefully before answering</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Take practice quizzes if available</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default StudentExams;