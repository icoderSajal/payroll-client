import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //https://payroll-server-1.onrender.com/api/v1/auth/login

    try {
      const response = await axios.post(
        `https://payroll-server-1.onrender.com/api/v1/auth/login`,
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");

        setTimeout(() => {
          if (response.data.user.role === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/employee-dashboard");
          }
        }, 1000); // allow toast to show
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
        <h2 className="font-sevillana text-3xl text-white">
          Employee Management System
        </h2>
        <div className="shadow p-6 w-80 bg-white rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <span className="block text-gray-700">Email address</span>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-2xl"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <span className="block text-gray-700">Password</span>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-2xl"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="mb-4 flex items-center justify-between text-sm">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-teal-600 hover:underline">
                Forgot Password?
              </a>
            </div> */}
            <button
              className="w-full bg-teal-600 text-white py-2 rounded-2xl hover:bg-teal-950 hover:ring-2 transition-all duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
