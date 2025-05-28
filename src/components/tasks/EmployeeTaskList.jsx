import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { colums, TaskButtons } from "../../utils/TasksHelper";
import { Link, useParams } from "react-router-dom";

const EmployeeTaskList = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true); // 🔹 Loading state

  const fetchTasks = async () => {
    //////////////
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/task/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setTasks(response.data.tasks);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch salary data.";
      toast.error(errMsg);
    } finally {
      setLoading(false); // Stop loading
    }
    //////////////////
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {loading ? ( // 🔹 Show loading state
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading tasks...</p>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl md:text-3xl">Task List</h3>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="px-6 py-3">SNO</th>

                  <th className="px-6 py-3">Task Type</th>
                  <th className="px-6 py-3">Start Date</th>
                  <th className="px-6 py-3">End Date</th>
                  <th className="px-6 py-3">Remarks</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((tks, index) => (
                  <tr
                    key={tks.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border:gray-700"
                  >
                    <td className="px-6 py-3">{index + 1}</td>

                    <td className="px-6 py-3">{tks.taskType}</td>
                    <td className="px-6 py-3">
                      {new Date(tks.startDate)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, "/")}
                    </td>
                    <td className="px-6 py-3">
                      {new Date(tks.endDate)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .replace(/ /g, "/")}
                    </td>
                    <td className="px-6 py-3">{tks.comments}</td>
                    <td className="px-6 py-3">{tks.status}</td>
                    <td className="px-6 py-3">
                      <Link
                        to={`/employee-dashboard/task/detail/${tks.id}`}
                        className="px-4 py-1 bg-teal-500 rounded-lg text-white font-bold hover:bg-teal-700"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeTaskList;
