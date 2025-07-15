import { Outlet } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import bg from "../../assets/Auth_Bg.jpg";

const HeadCookDashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (

        <div
            className="flex h-screen overflow-hidden bg-gray-50 bg-cover"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex flex-col flex-1">
                <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default HeadCookDashboard;
