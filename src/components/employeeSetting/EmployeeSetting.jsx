import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";
const EmployeeSetting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not Matched");
    } else {
      try {
        const response = await axios.put(
          `${Base_Url}/api/v1/setting/change-password`,
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          toast.success("Password Change Successfully!!!");
          navigate("/employee-dashboard");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="max-w-3xl  mx-auto mt-10 bg-amber-50 p-8 rounded-md  shadow-md w-96">
      <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
        Reset Password
      </h3>

      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="oldPassword" type="text">
            Old Password
          </label>
          <input
            placeholder="Old Password"
            name="oldPassword"
            type="password"
            onChange={handleChnage}
            className="block w-full text-sm font-medium text-gray-700 p-2 border border-gray-300  rounded-md"
          />
        </div>
        <div className="">
          <label htmlFor="newPassword" type="text">
            New Password
          </label>
          <input
            placeholder="New Password"
            name="newPassword"
            onChange={handleChnage}
            className="block w-full text-sm font-medium text-gray-700 p-2 border border-gray-300  rounded-md"
            type="password"
          />
        </div>
        <div className="">
          <label htmlFor="confirmPassword" type="text">
            Confirm Password
          </label>
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChnage}
            className="block w-full text-sm font-medium text-gray-700 p-2 border border-gray-300  rounded-md"
            type="password"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <button
            type="submit"
            className="w-full mt-6 font-bold bg-teal-500 text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  );
};

export default EmployeeSetting;
