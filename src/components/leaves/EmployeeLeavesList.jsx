import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";
const EmployeeLeavesList = () => {
  let sno = 1;
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${Base_Url}/api/v1/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // alert(response.data.leaves);
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch Leaves data.";
      toast.error(errMsg);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
          Manage Leaves
        </h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Department"
          className="px-4 py-1 shadow-2xl h-12  border border-gray-300 rounded-2xl "
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/leaves/add"
            className="flex justify-end items-center bg-teal-500 font-semibold text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
          >
            Add New Leave
          </Link>
        )}
      </div>
      <div className="mt-5">
        {leaves.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Leave Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves?.map((leave) => (
                <tr
                  key={leave._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border:gray-700"
                >
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">{leave.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Records...</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeLeavesList;
