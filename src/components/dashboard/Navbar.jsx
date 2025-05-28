import { useAuth } from "../../context/AuthContext";

import { FaBars } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  

  return (
    <div className="flex items-center justify-between h-16 bg-teal-600 text-white px-4 fixed top-0 left-0 right-0 z-30 md:ml-64 shadow-md">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle for Mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden focus:outline-none text-white"
        >
          <FaBars size={20} />
        </button>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <p className="text-4xl sm:text-lg  truncate font-semibold ">
          Welcome, {user?.name || "Admin"}
        </p>
        <button
          onClick={logout}
          className="flex  justify-center items-center gap-2 py-2 px-4 font-semibold bg-teal-800 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300 text-sm sm:text-base"
        >
          Logout <AiOutlineLogout size={28} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
