import { useNavigate } from "react-router-dom";

export const colums = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    sortable: true,
    width: "100px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "150px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
    width: "150px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
    width: "200px",
  },

  {
    name: "Days",
    selector: (row) => row.days,
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

export const LeaveButtons = ({ Id }) => {
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
