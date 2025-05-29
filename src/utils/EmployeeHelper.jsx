import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      "https://payroll-server-1.onrender.com/api/v1/department",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return departments;
};

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `https://payroll-server-1.onrender.com/api/v1/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return employees;
};

export const getAllEmployees = async () => {
  let employees;
  try {
    const response = await axios.get(
      "https://payroll-server-1.onrender.com/api/v1/employee",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      toast.error(error.response.data.error);
    }
  }
  return employees;
};

export const colums = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "80px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "200px",
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "200px",
  },

  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
          className="px-3 py-1 rounded bg-sky-500 text-white hover:bg-green-950 transition-all duration-300"
        >
          View
        </button>
        <button
          type="button"
          onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}
          className="px-3 py-1 rounded bg-green-700 text-white hover:bg-green-950 transition-all duration-300"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
          className="px-3 py-1 rounded bg-purple-700 text-white hover:bg-green-950 transition-all duration-300"
        >
          Salary
        </button>

        <button
          type="button"
          onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
          className="px-3 py-1 rounded bg-red-500 text-white hover:bg-green-950 transition-all duration-300"
        >
          Leave
        </button>
      </div>
    </>
  );
};
