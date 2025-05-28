import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const EmployeeSummary = () => {
  const { user } = useAuth();
  return (
    <div
      className={`rounded-xl w-lg mt-4 shadow-lg p-5 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-teal-800`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">
          <FaUser />
        </div>
        <div className="text-right">
          <h4 className="text-lg font-semibold">Welcome Back</h4>
          <p className="text-2xl font-bold">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
