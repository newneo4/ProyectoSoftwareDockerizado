import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import LoginPage from "@/features/login/LoginPage";
import RegisterPage from "@/features/register/RegisterPage";
import Home from "@/features/landing/LandingPage";

export const UserRoutes = () => {
  return (
    <>
        <div className="w-full">
            <Routes>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="/" element={<Home/>} />
            </Routes>
        </div>
    </>   
  );
};
