import { useState } from "react";
import { Link } from "react-router-dom";
import InstructorSidebar from "../InstructorSidebar";

const InstructorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
            <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
              Instructor Hub
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* <span className="font-medium text-slate-600 hidden md:block">Prof. Smith</span> */}
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-white bg-gradient-to-r from-purple-600 to-indigo-500 shadow-2xl shadow-purple-200">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-4 leading-tight">
              Welcome back, Professor!
            </h2>
            <p className="text-white/80 text-base lg:text-lg mb-6 lg:mb-8">
              Empower your students with great content. Create engaging exams and track progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Link to="/generate-exam" className="bg-white text-purple-700 px-6 lg:px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md hover:shadow-lg">
                Generate Exam
              </Link>
              <button className="border-2 border-white text-white px-6 lg:px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition">
                View Analytics
              </button>
            </div>
          </div>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-10">
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Active Students</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">142</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">+12 this month</p>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Exams Created</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">24</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">3 drafts in progress</p>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Avg. Score</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">78%</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">+5% from last term</p>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Pending Reviews</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">7</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">Need attention</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-12">
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-4">Recent Activities</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-xl bg-purple-50">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Created "Calculus Midterm" exam</p>
                    <p className="text-sm text-slate-500">Yesterday • 45 questions added</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Graded "Physics 101" assignments</p>
                    <p className="text-sm text-slate-500">2 days ago • 32 papers graded</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">New students enrolled in "Chemistry"</p>
                    <p className="text-sm text-slate-500">3 days ago • 8 new students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">New Exam</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Grade Papers</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Add Student</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Analytics</span>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="font-medium text-slate-800 mb-3">Upcoming Deadlines</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Physics Midterm Grading</span>
                    <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Tomorrow</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Math Final Exam Creation</span>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">3 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;