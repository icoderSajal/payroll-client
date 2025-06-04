// EmployeeBarChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/dashboard/employees-by-department"
      );
      const data = response.data;

      const labels = data.map((item) => item.departmentName);
      const counts = data.map((item) => item.employeeCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Employees per Department",
            data: counts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2>Employees per Department</h2>
      <Bar
        data={chartData}
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
      />
    </div>
  );
};

export default EmployeeBarChart;
