import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";
const EmployeeView = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/v1/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          toast.error("Failed to fetch employee data.");
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        No employee data found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">
        Employee Details
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            alt="Profile"
            src={`${Base_Url}/${employee?.userId?.profileImage}`}
            className="rounded-full shadow-md w-60 h-60 object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-5 text-gray-700">
          <div className="flex">
            <p className="w-40 font-semibold">Name:</p>
            <p>{employee?.userId?.name}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-semibold">Employee ID:</p>
            <p>{employee?.employeeId}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-semibold">Date of Birth:</p>
            <p>{new Date(employee?.dob).toLocaleDateString()}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-semibold">Gender:</p>
            <p>{employee?.gender}</p>
          </div>
          <div className="flex">
            <p className="w-40 font-semibold">Department:</p>
            <p>{employee?.department?.dep_name}</p>
          </div>
          {/* <div className="flex">
            <p className="w-40 font-semibold">Marital Status:</p>
            <p>{employee?.maritalStatus}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
