import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
