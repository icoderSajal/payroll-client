import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";
import Bg from "../../assets/Auth_Bg.jpg";
import { IoEyeOff, IoEye } from "react-icons/io5";


const roleRoutes = {
  admin: "/admin-dashboard",
  voyager: "/voyager-dashboard",
  manager: "/manager-dashboard",
  headcook: "/headcook-dashboard",
  supervisor: "/supervisor-dashboard",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${Base_Url}/api/v1/auth/login`, formData);

      if (data.success) {
        login(data.user);
        localStorage.setItem("token", data.token); // NOTE: Insecure for production
        toast.success("Login successful!");

        const route = roleRoutes[data.user.role];
        setTimeout(() => {
          if (route) navigate(route);
          else toast.error("Unknown role. Cannot redirect.");
        }, 1000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error?.response?.data?.message || "Invalid email or password. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div
        className="w-full h-[100vh] bg-cover flex justify-center items-center"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <div className="p-6 w-120 h-100 bg-[#000000000] backdrop-blur shadow-lg shadow-black rounded-3xl">
          <h2 className="font-sevillana text-3xl text-teal-100">
            Cruise Ship Management
          </h2>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="w-full px-3 py-2 border rounded-2xl text-[white]"
                placeholder="Enter Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}

                name="password"
                autoComplete="current-password"
                className="w-full px-3 py-2 border rounded-2xl text-[white]"
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
              {!showPassword && (
                <IoEye
                  className="absolute top-[35px] right-[20px] w-[25px] h-[20px] text-[white] cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
              {showPassword && (
                <IoEyeOff
                  className="absolute top-[35px] right-[20px] w-[25px] h-[20px] text-[white] cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>
            <button
              className="w-full flex justify-center items-center gap-2 bg-teal-600 text-white py-2 rounded-2xl hover:bg-teal-950 hover:ring-2 transition-all duration-300 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
