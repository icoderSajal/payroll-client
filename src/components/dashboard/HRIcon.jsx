import { FaUsers, FaCog, FaCalendarAlt } from "react-icons/fa";

const HRIcon = () => {
  return (
    <div className="flex items-center justify-center space-x-2 bg-teal-100 text-teal-700 p-4 rounded-full shadow-md w-fit">
      <FaUsers size={28} />
      <FaCog size={24} />
      <FaCalendarAlt size={22} />
    </div>
  );
};

export default HRIcon;
