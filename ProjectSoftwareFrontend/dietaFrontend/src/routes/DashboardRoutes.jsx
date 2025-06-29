import { Route } from "react-router-dom";
import DashboardPage from "@/features/dashboard/DashboardPage";

const DashboardRoutes = () => {
  return (
    <>
      <Route index element={<DashboardPage />} />
    </>
  );
};

export default DashboardRoutes;
