import { Outlet, Navigate } from "react-router-dom";

export default function PrivateLayout() {
  const { isAuthenticated } = true 
  
  return isAuthenticated ? (
    <div>
      <header>Dashboard Privado</header>
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
