import axios from "axios";
import { useEffect, useState } from "react";
import InstructorSidebar from "../component/InstructorSidebar";

const AssignStudent = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        axios.get(`${apiUrl}/student`),
        axios.get(`${apiUrl}/courses`)
      ]);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrorMessage("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAssign = async () => {
    if (!studentId || !courseId) {
      setErrorMessage("Please select both a student and a course.");
      return;
    }

    setAssigning(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post(`${apiUrl}/courses/assign`, {
        st_id: studentId,
        crs_id: courseId,
      });

      const student = students.find(s => s.st_id == studentId);
      const course = courses.find(c => c.crs_id == courseId);
      
      setSuccessMessage(`Successfully assigned ${student?.st_name} to ${course?.crs_name}!`);
      
      // Reset selections
      setStudentId("");
      setCourseId("");
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error assigning student to course.");
    } finally {
      setAssigning(false);
    }
  };

  const getSelectedStudent = () => {
    return students.find(s => s.st_id == studentId);
  };

  const getSelectedCourse = () => {
    return courses.find(c => c.crs_id == courseId);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

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
                Assign Students to Courses
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage student enrollments and course assignments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">Admin</span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl p-6 lg:p-8 text-white shadow-xl mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-6 lg:mb-0 lg:mr-8">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">Student Enrollment</h2>
                <p className="text-white/80 mb-4">
                  Assign students to courses and manage their academic journey
                </p>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{students.length}</div>
                    <div className="text-sm text-white/80">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <div className="text-sm text-white/80">Available Courses</div>
                  </div>
                </div>
              </div>
             
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:p-8 mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Assign Student to Course</h3>
            
            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-green-800 font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-800 font-medium">{errorMessage}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                  <p className="mt-4 text-slate-600">Loading data...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Student Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Select Student
                      </span>
                    </label>
                    <div className="relative">
                      <select 
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="">Choose a student...</option>
                        {students.map((student) => (
                          <option key={student.st_id} value={student.st_id}>
                            {student.st_name} (ID: {student.st_id})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Selected Student Info */}
                    {studentId && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{getSelectedStudent()?.st_name}</p>
                            <p className="text-sm text-slate-600">Student ID: {studentId}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Select Course
                      </span>
                    </label>
                    <div className="relative">
                      <select 
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="">Choose a course...</option>
                        {courses.map((course) => (
                          <option key={course.crs_id} value={course.crs_id}>
                            {course.crs_name} (ID: {course.crs_id})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Selected Course Info */}
                    {courseId && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{getSelectedCourse()?.crs_name}</p>
                            <p className="text-sm text-slate-600">Course ID: {courseId}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Assignment Preview */}
                {(studentId && courseId) && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">Assignment Preview</h4>
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 lg:mb-0">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center mr-4">
                          <span className="font-bold text-purple-600">
                            {getSelectedStudent()?.st_name?.charAt(0) || 'S'}
                          </span>
                        </div>
                        <div className="text-center lg:text-left">
                          <p className="font-medium text-slate-800">{getSelectedStudent()?.st_name}</p>
                          <p className="text-sm text-slate-600">Student</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-4 lg:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center mr-4">
                          <span className="font-bold text-blue-600">
                            {getSelectedCourse()?.crs_name?.charAt(0) || 'C'}
                          </span>
                        </div>
                        <div className="text-center lg:text-left">
                          <p className="font-medium text-slate-800">{getSelectedCourse()?.crs_name}</p>
                          <p className="text-sm text-slate-600">Course</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assign Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleAssign}
                    disabled={!studentId || !courseId || assigning}
                    className={`px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center min-w-[200px] ${!studentId || !courseId || assigning
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {assigning ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Assigning...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Assign Student to Course
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Total Students</p>
                  <h4 className="text-2xl font-bold text-slate-800">{students.length}</h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Available Courses</p>
                  <h4 className="text-2xl font-bold text-slate-800">{courses.length}</h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">Ready to Assign</p>
                  <h4 className="text-2xl font-bold text-slate-800">
                    {studentId && courseId ? "1" : "0"}
                  </h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssignStudent;