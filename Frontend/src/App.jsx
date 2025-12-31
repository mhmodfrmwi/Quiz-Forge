
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddQuestion from './pages/AddQuestion'
import ExamGenerator from './pages/ExamGenerator'
import ExamPage from './pages/ExamPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './component/ProtectedRoute'
import StudentDashboard from './component/Dashboard/StudentDashboard'
import InstructorDashboard from './component/Dashboard/InstructorDashboard'
import AdminDashboard from './component/Dashboard/AdminDashboard'
import QuestionBank from './pages/QuestionBank'
import AllExams from './pages/AllExams'
import InstructorExams from './pages/InstructorExams'
import StudentCourse from './pages/StudentCourse'
import StudentExams from './pages/StudentExams'
import StudentGrades from './pages/StudentGrades'
import AssignStudent from './pages/AssignStudent'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/student-dashboard" element={
         <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard/>
          </ProtectedRoute>
        } />
      <Route path="/my-courses" element={
         <ProtectedRoute allowedRoles={["student"]}>
            <StudentCourse/>
          </ProtectedRoute>
        } />
      <Route path="/course/:courseId" element={
         <ProtectedRoute allowedRoles={["student"]}>
            <StudentExams/>
          </ProtectedRoute>
        } />

      <Route path="/my-exams" element={
         <ProtectedRoute allowedRoles={["student"]}>
            <StudentExams/>
          </ProtectedRoute>
        } />
      <Route path="/my-grades" element={
         <ProtectedRoute allowedRoles={["student"]}>
            <StudentGrades/>
          </ProtectedRoute>
        } />
      <Route path="/exam/:id" element={
         <ProtectedRoute allowedRoles={["student"]}>
            <ExamPage/>
          </ProtectedRoute>
        } />
      <Route path="/generate-exam" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <ExamGenerator/>
          </ProtectedRoute>
        } />
      <Route path="/instructor-dashboard" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <InstructorDashboard/>
          </ProtectedRoute>
        } />
      <Route path="/add-question" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <AddQuestion/>
          </ProtectedRoute>
        } />
      <Route path="/question-bank" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <QuestionBank/>
          </ProtectedRoute>
        } />
      <Route path="/all-exams" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <AllExams/>
          </ProtectedRoute>
        } />
      <Route path="/instructor-exams" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <InstructorExams/>
          </ProtectedRoute>
        } />
      <Route path="/assign-student" element={
         <ProtectedRoute allowedRoles={["instructor"]}>
            <AssignStudent/>
          </ProtectedRoute>
        } />
      <Route path="/admin-dashboard" element={
         <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard/>
          </ProtectedRoute>
        } />
    </Routes>
    </>
  )
}

export default App
