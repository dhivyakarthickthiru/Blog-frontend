import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  // If token is not redirect login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token is available → page allow
  return children;
};

export default ProtectedRoute;
