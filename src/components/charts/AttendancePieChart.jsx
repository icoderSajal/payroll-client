import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AttendancePieChart({ data }) {
  const chartData = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        data: [
          data.filter((item) => item.status === "Present").length,
          data.filter((item) => item.status === "Absent").length,
          data.filter((item) => item.status === "Leave").length,
        ],
        backgroundColor: ["#4CAF50", "#F44336", "#FFEB3B"],
      },
    ],
  };

  const options = {
    animation: false, // 👈 disables animation
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}
