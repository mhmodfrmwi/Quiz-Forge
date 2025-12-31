
import { Link, NavLink } from "react-router-dom";

const InstructorSidebar = ({ sidebarOpen, toggleSidebar }) => {

    return (
        <>
       {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside className={`h-screen fixed top-0 left-0 lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col items-center py-8 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="text-2xl font-bold text-purple-600 mb-10">ITI</div>
        <nav className="w-full space-y-4 px-4">
          <NavLink to="/instructor-dashboard" className="p-3   rounded-xl cursor-pointer font-medium flex items-center"> 
           <span>Dashboard</span>
          </NavLink>
          
          <NavLink to="/add-question" className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>Add Question</span>
          </NavLink>
          <NavLink to="/question-bank"  className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>Question Bank</span>
          </NavLink>
          <NavLink to="/generate-exam"  className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>Generate Exam</span>
          </NavLink>
          <NavLink to="/instructor-exams"  className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>All Exams</span>
          </NavLink>
          <NavLink to="/assign-student" className="p-3 text-slate-400 hover:text-purple-600 cursor-pointer font-medium hover:bg-purple-50 rounded-xl transition-colors flex items-center"> 
            <span>Assign Students</span>
          </NavLink>
        </nav>
        
        <div className="mt-auto flex flex-col items-center p-4 lg:hidden">
          <div className="w-10 h-10 rounded-full bg-purple-200 border-2 border-white shadow-sm mb-2"></div>
         </div>
      </aside>
        </>

  )
}
export default InstructorSidebar;