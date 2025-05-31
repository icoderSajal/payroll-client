import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";

import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import AttendancePieChart from "../charts/AttendancePieChart";
import { Base_Url } from "../../service/Endpoints";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          `${{ Base_Url }}/api/v1/admin-report/get`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setAttendanceData(response.data.atts);
        }
      } catch (error) {
        toast.error("Failed to fetch attendance data");
      }
    };

    fetchAttendanceData();
  }, []);
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          `${Base_Url}/api/v1/dashboard/summary`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(summary.data);
        setSummary(summary.data);
      } catch (error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          console.log(error.message);
        }
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
        Dashboard Overview
      </h3>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCards
          icons={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-gradient-to-tr from-teal-500 to-teal-700"
        />
        <SummaryCards
          icons={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-gradient-to-tr from-rose-400 to-rose-600"
        />
        <SummaryCards
          icons={<FaMoneyBillWave />}
          text="Monthly Pay"
          number={summary.totalSalary}
          color="bg-gradient-to-tr from-amber-400 to-amber-600"
        />
      </div>

      {/* Leave Details */}
      <div className="mt-16">
        <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
          Leave Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <SummaryCards
            icons={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-gradient-to-tr from-blue-500 to-blue-700"
          />
          <SummaryCards
            icons={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-gradient-to-tr from-green-400 to-green-600"
          />
          <SummaryCards
            icons={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-gradient-to-tr from-yellow-400 to-yellow-600"
          />
          <SummaryCards
            icons={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-gradient-to-tr from-red-400 to-red-600"
          />
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <AttendancePieChart
            data={attendanceData}
            options={{ animation: false }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default AdminSummary;
