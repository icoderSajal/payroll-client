import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { colums, LeaveButtons } from "../../utils/LeavesHelper";
import { Base_Url } from "../../service/Endpoints";

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const fetchLeaves = async () => {
    setLoading(true); // Start loader
    try {
      // Simulate 2-second loading delay (optional, for UX polish)
      setTimeout(async () => {
        const response = await axios.get(`${Base_Url}/api/v1/leave`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const leavedata = response.data.leaves.map((leave) => ({
            _id: leave._id,
            sno: sno++,
            employeeId: leave.employeeId?.employeeId,
            name: leave.employeeId?.userId?.name,
            leaveType: leave.leaveType,
            department: leave.employeeId?.department?.dep_name,
            days:
              (new Date(leave.endDate) - new Date(leave.startDate)) /
                (1000 * 60 * 60 * 24) +
              1,
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />,
          }));

          setLeaves(leavedata);
          setFilteredLeaves(leavedata);
        }
        setLoading(false); // End loader after data is ready
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to Fetch Leaves Data");
      setLoading(false); // Ensure loader stops even on error
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleFilterChange = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByStatus = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-teal-700 font-semibold">
              Loading Leave Records...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
              Leave Management
            </h3>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-5">
            <input
              type="text"
              placeholder="Search by EmployeeId"
              onChange={handleFilterChange}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
            <div className="flex justify-between items-center gap-2">
              <button
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
                onClick={() => filterByStatus("Pending")}
              >
                Pending
              </button>
              <button
                onClick={() => filterByStatus("Approved")}
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Approved
              </button>
              <button
                onClick={() => filterByStatus("Rejected")}
                className="bg-teal-600 text-white px-2 font-bold py-2 rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <DataTable columns={colums} data={filteredLeaves} pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default LeaveManagement;
