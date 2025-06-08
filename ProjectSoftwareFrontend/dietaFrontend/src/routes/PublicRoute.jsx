import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
