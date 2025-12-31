import { Link, NavLink } from "react-router-dom";

const StudentSidebar = ({ sidebarOpen, toggleSidebar }) => {
  // const user = JSON.parse(localStorage.getItem('user')) ;
    return (
      <>
        {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
           <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col items-center py-8 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="text-2xl font-bold text-purple-600 mb-10">ITI</div>
                <nav className="w-full space-y-6 px-4">
                  <NavLink to="/student-dashboard" className="block text-slate-400 p-3 rounded-xl cursor-pointer font-medium"> 
                    <span className="ml-2">Home</span>
                  </NavLink>
                  <NavLink to="/my-courses" className="block p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors"> 
                    <span className="ml-2">My Courses</span>
                  </NavLink>
                  <NavLink to="/my-grades" className="block p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors"> 
                    <span className="ml-2">My Grades</span>
                  </NavLink>
                  {/* <NavLink to="/achievements" className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors"> 
                    <span className="ml-2">Achievements</span>
                  </NavLink> */}
                </nav>
                
                {/* <div className="mt-auto flex flex-col items-center p-4 lg:hidden">
                  <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm mb-2"></div>
                  <span className="font-medium text-slate-600 text-sm">{user?.fullname} </span>
                </div> */}
              </aside>
      </>
    )
}

export default StudentSidebar;