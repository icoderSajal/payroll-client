import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/dashboard/AdminSidebar";
import Navbar from "../../components/dashboard/navbar";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={` fixed z-40 inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-0 transition-transform duration-300 ease-in-out`}
      >
        <AdminSidebar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen w-[80%] md:ml-64">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="pt-16 px-4 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
