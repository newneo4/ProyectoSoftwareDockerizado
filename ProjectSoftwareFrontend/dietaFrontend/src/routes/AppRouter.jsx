import { Route, Routes } from "react-router-dom"

import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import { UserRoutes } from "./UserRoutes"
import { DashboardRoutes } from "./DashboardRoutes"

const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/*" element={
              <PublicRoute>
                <UserRoutes />
              </PublicRoute>
            }/>


            <Route path="/dashboard/*" element={
              <PrivateRoute>
              <DashboardRoutes />
            </PrivateRoute>
            }/>
        </Routes>
    </>
  )
}

export default AppRouter