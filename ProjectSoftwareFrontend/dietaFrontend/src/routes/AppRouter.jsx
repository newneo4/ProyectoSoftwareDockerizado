import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { UserRoutes } from "./UserRoutes";
import PrivateLayout from "@/layouts/PrivateLayout";
import DashboardPage from "@/features/dashboard/DashboardPage"; 
// import { BookPage } from "@/features/book/BookPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <PublicRoute>
          <UserRoutes />
        </PublicRoute>
      }/>

      <Route path="/dashboard" element={
        <PrivateRoute>
          <PrivateLayout />
        </PrivateRoute>
      }>
        <Route index element={<DashboardPage />} />
        {/* <Route path="book" element={<BookPage/>} /> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
