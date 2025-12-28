import { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col items-center py-8 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="text-2xl font-bold text-purple-600 mb-10">ITI</div>
        <nav className="w-full space-y-4 px-4">
          <Link to="/all-exams" className="block p-3 bg-purple-50 text-purple-600 rounded-xl cursor-pointer font-medium flex items-center"> 
            <span>All Exams</span>
          </Link>
          <div className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>User Management</span>
          </div>
          <div className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>System Settings</span>
          </div>
          <div className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
           <span>Reports</span>
          </div>
        
          
        </nav>
        
        <div className="mt-auto flex flex-col items-center p-4 lg:hidden">
          <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm mb-2"></div>
          <span className="font-medium text-slate-600 text-sm">Admin User</span>
        </div>
      </aside>

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
              Admin Control Panel
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-600 hidden md:block">Admin User</span>
            <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm"></div>
          </div>
        </header>

        <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-white bg-gradient-to-r from-purple-800 to-indigo-700 shadow-2xl shadow-purple-200">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl lg:text-4xl font-extrabold mb-4 leading-tight">
              System Overview
            </h2>
            <p className="text-white/80 text-base lg:text-lg mb-6 lg:mb-8">
              Maintain system integrity and monitor overall performance. Access all administrative controls.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <button className="bg-white text-purple-700 px-6 lg:px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md hover:shadow-lg">
                View Reports
              </button>
              <button className="border-2 border-white text-white px-6 lg:px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition">
                Manage Users
              </button>
            </div>
          </div>
          <img 
            src="https://illustrations.popsy.co/amber/key-visual.svg" 
            alt="admin vector" 
            className="absolute right-0 bottom-0 w-48 h-48 lg:w-80 lg:h-80 opacity-90"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-10">
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Total Users</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">1,248</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center text-xs text-slate-500">
                <span className="text-green-600 mr-1">▲</span>
                <span>+42 this week</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Active Sessions</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">89</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center text-xs text-slate-500">
                <span className="text-green-600 mr-1">▲</span>
                <span>Peak: 124 (2 PM)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">System Health</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-green-600">98%</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-2">Storage Used</p>
                <h4 className="text-2xl lg:text-3xl font-bold text-slate-800">64%</h4>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-12">
          {/* Recent Activities */}
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-4">System Activities</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-xl bg-purple-50">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">New user registration</p>
                    <p className="text-sm text-slate-500">5 minutes ago • 3 new users</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">System backup completed</p>
                    <p className="text-sm text-slate-500">1 hour ago • 2.4 GB stored</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Security scan passed</p>
                    <p className="text-sm text-slate-500">2 hours ago • No threats found</p>
                  </div>
                </div>

                <div className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Database optimization</p>
                    <p className="text-sm text-slate-500">3 hours ago • Performance improved 12%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 lg:p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Add User</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Run Backup</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-green-300 hover:bg-green-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Settings</span>
                </button>
                
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-medium text-slate-800 text-sm">Analytics</span>
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="font-medium text-slate-800 mb-3">System Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-slate-600">Database</span>
                    </div>
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">Healthy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-slate-600">API Server</span>
                    </div>
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-slate-600">Storage</span>
                    </div>
                    <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">64% Used</span>
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

export default AdminDashboard;