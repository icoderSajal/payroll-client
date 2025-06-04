import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
  FaUsers,
  FaBars,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const AdminSidebar = () => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const menuItems = [
    {
      to: "/admin-dashboard",
      icon: <MdDashboard size={22} />,
      label: "Dashboard",
    },
    {
      to: "/admin-dashboard/employees",
      icon: <FaUsers size={22} />,
      label: "Employees",
    },
    {
      to: "/admin-dashboard/departments",
      icon: <FaBuilding size={22} />,
      label: "Department",
    },
    {
      to: "/admin-dashboard/attendance",
      icon: <FaCheckToSlot size={22} />,
      label: "Attendance",
    },
    {
      to: "/admin-dashboard/leaves",
      icon: <FaCalendarAlt size={22} />,
      label: "Leaves",
    },
    {
      to: "/admin-dashboard/task",
      icon: <BiTask size={22} />,
      label: "Task Manager",
    },
    {
      to: "/admin-dashboard/employees/salaries",
      icon: <FaMoneyBillWave size={22} />,
      label: "Salary",
    },
    {
      to: `/admin-dashboard/setting/${user._id}`,
      icon: <FaCog size={22} />,
      label: "Setting",
    },
  ];

  return (
    <div
      className={`bg-gray-900 text-white fixed top-0 left-0 z-50 h-screen shadow-2xl transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="bg-teal-600 h-16 flex justify-between items-center px-4 shadow-inner">
        {!isCollapsed && (
          <h3 className="text-2xl font-bold tracking-wide font-pacific animate-pulse">
            Work Track
          </h3>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Menu */}
      <div className="px-2 py-6 space-y-2">
        {menuItems.map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-600 ring-2 ring-teal-400" : ""
              } flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-teal-500 transition-all duration-300 ease-in-out shadow-md`
            }
            end
          >
            {icon}
            {!isCollapsed && (
              <span className="text-base font-medium">{label}</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
