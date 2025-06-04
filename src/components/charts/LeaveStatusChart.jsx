// LeaveStatusChart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Base_Url } from "../../service/Endpoints";
const LeaveStatusChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const res = await axios.get(`${Base_Url}/api/v1/dashboard/summary`); // Adjust if endpoint differs
        const data = res.data.monthlyLeaveStatus;
        console.log(data);
        const months = Object.keys(data).sort();
        const approved = months.map((month) => data[month].Approved || 0);
        const pending = months.map((month) => data[month].Pending || 0);
        const rejected = months.map((month) => data[month].Rejected || 0);

        setChartData({
          labels: months,
          datasets: [
            {
              label: "Approved",
              data: approved,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
            {
              label: "Pending",
              data: pending,
              backgroundColor: "rgba(255, 206, 86, 0.6)",
            },
            {
              label: "Rejected",
              data: rejected,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch chart data", err);
      }
    };

    fetchLeaveData();
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <h3>Monthly Leave Status</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Leaves by Status and Month" },
          },
        }}
      />
    </div>
  );
};

export default LeaveStatusChart;
