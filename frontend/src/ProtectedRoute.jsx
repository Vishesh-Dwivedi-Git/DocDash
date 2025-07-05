import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./Store"; // Import Zustand store

const ProtectedRoute = ({ element }) => {
  const login = useAuthStore((state) => state.login);
  const token = localStorage.getItem("token");
  if (token) {
    login(token); // Log in using stored token  
  }
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation(); // Get the current location

  // If the user is not authenticated, redirect them to login and pass the current location
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the user is authenticated, render the given element
  return <>{element}</>;
};

export default ProtectedRoute;
