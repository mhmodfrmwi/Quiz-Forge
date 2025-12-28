import { useEffect, useState } from "react";
import userImage from "../assets/user.png";
import StudentSidebar from "../component/StudentSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const StudentCourse = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = import.meta.env.VITE_API_URL;
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.get(`${apiUrl}/student/${user.id}/courses`);
      setCourses(response.data);
    };
    fetchCourses();
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
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
            <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
              Student courses
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">
              {user?.fullname}{" "}
            </span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm">
              <img
                src={userImage}
                alt="user"
                className="w-8 h-8 rounded-full m-1"
              />
            </div>
          </div>
        </header>
        <div>
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div key={course.crs_id} 
                    onClick={() => navigate(`/course/${course.crs_id}`)}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-semibold mb-2">{course.crs_name}</h3>
                   
                    </div>
                ))}
            </div>

        </div>
      </main>
    </div>
  );
};

export default StudentCourse;
