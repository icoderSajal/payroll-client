import { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import { Bar } from "react-chartjs-2";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";
import EmployeeBarChart from "../charts/EmployeeBarChart";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 loader state

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const summary = await axios.get(
            `${Base_Url}/api/v1/dashboard/summary`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setSummary(summary.data);
        } catch (error) {
          if (error.response?.data?.error) {
            toast.error(error.response.data.error);
          } else {
            console.log(error.message);
          }
        } finally {
          setLoading(false);
        }
      }, 2000); // 2-second delay
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-teal-700 font-semibold">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/*<div className="mt-20">
        <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
          Dashboard Overview
        </h3>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <div className="bg-white p-6 shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-center">
              Total Employees
            </h4>
            <EmployeeBarChart />
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-center">
              Leave Summary
            </h4>
            <Bar
              data={{
                labels: ["Approved", "Pending", "Rejected"],
                datasets: [
                  {
                    label: "Leave Requests",
                    data: [
                      summary.leaveSummary.approved,
                      summary.leaveSummary.pending,
                      summary.leaveSummary.rejected,
                    ],
                    backgroundColor: [
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(255, 206, 86, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                    ],
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 w-full">
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
        </div>
      </div>*/}
      <div>Data</div>
    </>
  );
};

export default AdminSummary;
