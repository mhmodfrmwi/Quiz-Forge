import { Link } from "react-router-dom";
import { useState } from "react";
import userImage from "../../assets/user.png";
import StudentSidebar from "../StudentSidebar";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const user = JSON.parse(localStorage.getItem('user')) ;
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
              Student Portal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">{user?.fullname} </span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm">
              <img src={userImage} alt="user" className="w-8 h-8 rounded-full m-1"/>
            </div>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-white bg-gradient-to-r from-purple-600 to-indigo-500 shadow-2xl shadow-purple-200 ">
          <div className=" z-10 max-w-lg">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Welcome back,{user?.fullname}!
            </h2>
            <p className="text-white/80 text-base lg:text-lg mb-6 lg:mb-8">
              Ready to ace your next challenge? Check out your upcoming exams and continue your learning journey.
            </p>
            {/* <Link 
              to="/my-exams" 
              className="inline-block bg-white text-purple-700 px-6 lg:px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md hover:shadow-lg"
            >
              Start Exam
            </Link> */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-10">
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Upcoming Exams</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">3</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">Next: Math Final - Tomorrow</p>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Average Score</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">87%</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">+2% from last month</p>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Completed Courses</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">5</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">2 courses in progress</p>
            </div>
          </div>
        </div>

        <div className="mt-8 lg:mt-12">
          <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-4">Recent Activities</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
            <div className="space-y-4">
              <div className="flex items-center p-3 rounded-xl bg-purple-50">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800">Completed "Advanced Algebra" exam</p>
                  <p className="text-sm text-slate-500">Score: 92% • 2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800">Upcoming "Physics Midterm" exam</p>
                  <p className="text-sm text-slate-500">Starts in 1 day • 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-slate-800">Enrolled in "Chemistry 101" course</p>
                  <p className="text-sm text-slate-500">Started yesterday • 5 lessons completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;