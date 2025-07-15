import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../service/Endpoints";
import { Trash2, Pencil } from "lucide-react"

// Table columns
export const colums = [
  {
    name: "S No.",
    selector: (row) => row.sno,
    sortable: true,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

// Department action buttons
export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (Id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${Base_Url}/api/v1/department/${Id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Department deleted successfully!");
        onDepartmentDelete(); // call callback to update table
      } else {
        toast.error("Failed to delete department.");
      }
    } catch (error) {
      if (error.response && error.response.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        type="button"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
        className="px-3 py-1 rounded bg-green-700 text-white hover:bg-green-950 transition-all duration-300"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => handleDelete(Id)}
        className=" px-3 py-1 rounded bg-red-700 text-white  hover:bg-red-950 transition-all duration-300"
      >
        Delete
      </button>
    </div>
  );
};
