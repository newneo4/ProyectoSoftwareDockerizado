import { AuthContext } from "@/shared/context/AuthContext";
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // Fallback: intenta recuperar usuario del localStorage si AuthContext no lo tiene
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const effectiveUser = currentUser || localUser;
  const authenticated = isAuthenticated || !!localUser;

  useEffect(() => {
    console.log("🔍 PrivateRoute Debug:", {
      currentUser: currentUser?.email ?? "null",
      localUser: localUser?.email ?? "null",
      authenticated,
      loading,
      pathname: location.pathname,
    });
  }, [currentUser, loading, isAuthenticated, location.pathname]);

  if (!authenticated || !effectiveUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
