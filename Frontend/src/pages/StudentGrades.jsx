import axios from "axios";
import { useEffect, useState } from "react";
import userImage from "../assets/user.png";
import StudentSidebar from "../component/StudentSidebar";

const StudentGrades = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(`${apiUrl}/student/${user.id}/report`);
        
        setGrades(response.data);
      } catch (error) {
        console.error("Error fetching grades:", error);
      }
      setLoading(false);
    };

    fetchGrades();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
console.log(grades);
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
              My Grades
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">
              {user?.fullname}
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
          <h2 className="text-2xl font-bold mb-6">My Grades</h2>

          {loading ? (
            <p>Loading grades...</p>
          ) : grades.length === 0 ? (
            <p>No grades available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-slate-200 rounded-lg shadow-sm">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-slate-200 bg-slate-50 text-left text-sm font-semibold text-slate-700">
                      Course
                    </th>
                    {/* <th className="px-6 py-3 border-b border-slate-200 bg-slate-50 text-left text-sm font-semibold text-slate-700">
                      Exam
                    </th> */}
                    <th className="px-6 py-3 border-b border-slate-200 bg-slate-50 text-left text-sm font-semibold text-slate-700">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade) => (
                    <tr
                      key={grade.st_id + grade.crs_name+ grade.grade}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 border-b border-slate-200 text-sm text-slate-800">
                        {grade.crs_name}
                      </td>
                      {/* <td className="px-6 py-4 border-b border-slate-200 text-sm text-slate-800">
                        {grade.st_name}
                      </td> */}
                      <td className="px-6 py-4 border-b border-slate-200 text-sm text-slate-800">
                        {grade.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentGrades;
