import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { FaCheckToSlot, FaRegClipboard } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { user } = useAuth();
  return (
    <div className=" bg-gray-900 text-white h-screen fixed top-0 left-0 z-50 w-64 md:w-56 lg:w-64 shadow-2xl transition-transform duration-500 ease-in-out transform-gpu hover:scale-[1.01] perspective-1000">
      <div className="bg-teal-600 h-16 flex justify-center items-center shadow-inner">
        <h3 className="text-3xl font-bold tracking-wide font-pacific animate-pulse">
          Work Track
        </h3>
      </div>
      <div className="px-4 py-6 space-y-4">
        {/* Sidebar Item */}
        {[
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
            to: "/admin-dashboard/salary/add",
            icon: <FaMoneyBillWave size={22} />,
            label: "Salary",
          },

          // {
          //   to: "/admin-dashboard/reports",
          //   icon: <FaRegClipboard size={22} />,
          //   label: "Reports",
          // },

          {
            to: `/admin-dashboard/setting/${user._id}`,
            icon: <FaCog size={22} />,
            label: "Setting",
          },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `${
                isActive ? "bg-teal-600 ring-2 ring-teal-400" : ""
              } flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-teal-500 hover:translate-x-1 hover:scale-105 transition-all duration-300 ease-in-out shadow-md`
            }
            end
          >
            {icon}
            <span className="text-lg font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
