import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { UserRoutes } from "./UserRoutes";
import PrivateLayout from "@/layouts/PrivateLayout";
import DashboardPage from "@/features/dashboard/DashboardPage"; 
import BookPage from "@/features/book/BookPage";
import BibliotecaPage from "@/features/biblioteca/BibliotecaPage";
import HistorialPage from "@/features/historial/HistorialPage";
import IntercambioPage from "@/features/intercambio/IntercambioPage";
import DonacionesPage from "@/features/donaciones/Donaciones";
import CambiosPage from "@/features/cambios/CambiosPage";

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
        <Route path="book" element={<BookPage/>} />
        <Route path="biblioteca" element={<BibliotecaPage/>} />
        <Route path="historial" element={<HistorialPage/>} />
        <Route path="intercambio" element={<IntercambioPage/>} />
        <Route path="donacion" element={<DonacionesPage/>} />
        <Route path="cambios" element={<CambiosPage/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
