import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser.role) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
