import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import DashboardPage from "@/features/dashboard/DashboardPage";

export const DashboardRoutes = () => {
  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<DashboardPage />} />

        </Routes>
      </div>  
    </>
  );
};
