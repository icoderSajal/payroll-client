import { useNavigate } from "react-router-dom";
export const colums = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    sortable: true,
    width: "80px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "130px",
  },
  {
    name: "Task Type",
    selector: (row) => row.taskType,
    sortable: true,
    width: "120px",
  },
  {
    name: "Start Date",
    selector: (row) => row.startDate,
    sortable: true,
    width: "140px",
  },

  {
    name: "End Date",
    selector: (row) => row.endDate,
    sortable: true,
    width: "140px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const TaskButtons = ({ Id }) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/admin-dashboard/leave/detail/${Id}`);
  };
  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded-lg text-white font-bold hover:bg-teal-700"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  );
};
