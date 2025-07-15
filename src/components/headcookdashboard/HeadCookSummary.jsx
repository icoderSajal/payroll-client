import { FaUser, FaCocktail } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const HeadCookSummary = () => {
    const { user } = useAuth();
    return (
        <div
            className={`rounded-xl w-lg mt-4 shadow-lg p-5 text-white transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-teal-800`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">
                    <FaCocktail />
                </div>
                <div className="text-right">
                    <h4 className="text-lg font-semibold">Welcome Back</h4>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-lg font-bold"> {user.role}</p>
                </div>
            </div>
        </div>
    );
};

export default HeadCookSummary;
