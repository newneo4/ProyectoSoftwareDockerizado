import { AuthContext } from "@/shared/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const effectiveUser = currentUser || localUser;

  return effectiveUser ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
