
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    FaUsers,

    FaBuilding,

    FaCalendarAlt,
    FaCog, FaShoppingBasket, FaShoppingCart
} from "react-icons/fa";
import { LayoutDashboardIcon, Users2, FolderKanban, ShipIcon, X, LayoutList, AppWindow, Tickets, SquareActivityIcon, ScissorsLineDashedIcon, CakeSliceIcon, ListCheck } from "lucide-react"
import { MdFoodBank } from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();

    const adminMenus = [
        { to: "/admin-dashboard", icon: <LayoutDashboardIcon size={22} />, label: "Dashboard" },
        { to: "/admin-dashboard/employees", icon: <Users2 size={22} />, label: "User Registration" },
        { to: "/admin-dashboard/departments", icon: <FolderKanban size={22} />, label: "Department" },
        { to: "/admin-dashboard/menus", icon: <AppWindow size={22} />, label: "Menus" },
        { to: "/admin-dashboard/items", icon: <LayoutList size={22} />, label: "Items" },


        { to: `/admin-dashboard/tickets`, icon: <Tickets size={22} />, label: "Movie Ticket" },
        { to: `/admin-dashboard/salons`, icon: <ScissorsLineDashedIcon size={22} />, label: "Salon & Spa" },
        { to: `/admin-dashboard/fitness`, icon: <SquareActivityIcon size={22} />, label: "Fitness Center" },
        { to: `/admin-dashboard/parties`, icon: <CakeSliceIcon size={22} />, label: "Party Hall" },
        { to: "/admin-dashboard/order-list", icon: <ListCheck size={22} />, label: "Order List" },


    ];

    const voyagerMenus = [
        { to: "/voyager-dashboard", icon: <LayoutDashboardIcon size={22} />, label: "Dashboard" },
        { to: "/voyager-dashboard/order-items", icon: <FaShoppingCart size={22} />, label: "Orders" },
        { to: "/voyager-dashboard/booking", icon: <Tickets size={22} />, label: "Booking" },
        { to: "/voyager-dashboard/order-list/:id", icon: <ListCheck size={22} />, label: "Order List" },

    ];

    const managerMenus = [
        { to: "/manager-dashboard", icon: <LayoutDashboardIcon size={22} />, label: "Dashboard" },
        { to: "/manager-dashboard/employees", icon: <FaUsers size={22} />, label: "View booked Resort-Movie Tickets" },
        { to: "/manager-dashboard/departments", icon: <FaBuilding size={22} />, label: "View booked beauty salon" },
        { to: "/manager-dashboard/attendance", icon: <FaBuilding size={22} />, label: "View booked fitness center" },
        { to: "/manager-dashboard/leaves", icon: <FaCalendarAlt size={22} />, label: "View booked Party Hall" },
        // { to: `/admin-dashboard/setting/${user?._id}`, icon: <FaCog size={22} />, label: "Setting" },
    ];

    const headcookMenus = [
        { to: "/headcook-dashboard", icon: <LayoutDashboardIcon size={22} />, label: "Dashboard" },
        { to: "/headcook-dashboard/catering-orders", icon: <MdFoodBank size={22} />, label: "Catering Orders" },
        // { to: `/admin-dashboard/setting/${user?._id}`, icon: <FaCog size={22} />, label: "Setting" },
    ];

    const supervisorMenus = [
        { to: "/supervisor-dashboard", icon: <LayoutDashboardIcon size={22} />, label: "Dashboard" },
        { to: "/supervisor-dashboard/stationery-orders", icon: <FaShoppingBasket size={22} />, label: "Stationery Orders" },
        { to: `/supervisor-dashboard/setting/${user?._id}`, icon: <FaCog size={22} />, label: "Setting" },
    ];


    // Function to pick menu based on user role
    const getMenuByRole = (role) => {
        switch (role) {
            case "admin":
                return adminMenus;
            case "voyager":
                return voyagerMenus;
            case "manager":
                return managerMenus;
            case "headcook":
                return headcookMenus;
            case "supervisor":
                return supervisorMenus;
            default:
                return [];
        }
    };

    const menusToRender = getMenuByRole(user?.role);
    let userRole = user.role;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={onClose}
                />
            )}

            <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full w-64 z-40 shadow-lg shadow-amber-950 md:relative md:translate-x-0 md:block bg-[#000000000] backdrop-blur"
            >
                {/* Top bar on mobile */}
                <div className="flex items-center justify-between px-4 py-3 border-b md:hidden">
                    <h2 className="text-lg font-semibold text-white">{user.role}</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex flex-col p-4 gap-2 font-semibold text-lg">
                    <h1 className="text-2xl text-center uppercase mb-10 text-gray-100">👨‍💻{userRole}</h1>
                    {menusToRender.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-gray-700 p-2 rounded transition ${isActive ? "bg-teal-600 text-white" : "hover:bg-gray-100"
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </motion.aside>
        </>
    );
};

export default Sidebar;
