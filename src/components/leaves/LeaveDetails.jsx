import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTrash } from "react-icons/fa";

const LeaveDetails = () => {
  const [leave, setLeave] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
          console.log(response.data.leave); // ✅ Proper logging
        } else {
          toast.error("Failed to fetch employee data.");
        }
      } catch (error) {
        if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        No data found.
      </div>
    );
  }

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      } else {
        toast.error("Failed to fetch employee data.");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred while fetching data.");
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Employee Leave Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
        <DetailRow
          label="Name"
          value={leave.employeeId?.userId?.name || "N/A"}
        />
        <DetailRow label="Employee ID" value={leave.employeeId?.employeeId} />
        <DetailRow label="Leave Type" value={leave.leaveType} />
        <DetailRow label="Reason" value={leave.reason} />
        <DetailRow
          label="Start Date"
          value={new Date(leave.startDate).toLocaleDateString()}
        />
        <DetailRow
          label="End Date"
          value={new Date(leave.endDate).toLocaleDateString()}
        />
        <div className="col-span-1 sm:col-span-2">
          <p className="font-semibold mb-2">
            {leave.status === "Pending" ? "Action" : "Status"}:
          </p>
          {leave.status === "Pending" ? (
            <div className="flex gap-4">
              <button
                className="flex justify-between items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={() => changeStatus(leave._id, "Approved")}
              >
                Approved
                <FaCheckCircle />
              </button>
              <button
                className="flex justify-between items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => changeStatus(leave._id, "Rejected")}
              >
                Reject
                <FaTrash />
              </button>
            </div>
          ) : (
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 font-medium rounded-full">
              {leave.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-medium">{value}</p>
  </div>
);

export default LeaveDetails;
