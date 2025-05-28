import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { colums, TaskButtons } from "../../utils/TasksHelper";
import { Link } from "react-router-dom";

const AlltaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Loading state

  const fetchTasks = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:8000/api/v1/task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const taskdata = response.data.tasks.map((task) => ({
          _id: task._id,
          sno: sno++,
          employeeId: task.employeeId?.employeeId,
          name: task.employeeId?.userId?.name,
          taskType: task.taskType,
          startDate: new Date(task.startDate).toLocaleDateString(),
          endDate: new Date(task.endDate).toLocaleDateString(),
          status: task.status,
          action: <TaskButtons Id={task._id} />,
        }));

        setTasks(taskdata);
        setFilteredTasks(taskdata);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to Fetch Tasks");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredRecords = tasks.filter((tsk) =>
      tsk.employeeId?.toLowerCase().includes(query)
    );
    setFilteredTasks(filteredRecords);
  };

  const filterByStatus = (status) => {
    const data = tasks.filter((task) =>
      task.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredTasks(data);
  };

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
            <h3 className="font-bold text-2xl md:text-3xl">Task Management</h3>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-5">
            <input
              type="text"
              placeholder="Search by Employee ID"
              onChange={handleFilterChange}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
            <div className="flex justify-between items-center gap-2">
              <Link
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
                to="/admin-dashboard/task/add"
              >
                Add Task
              </Link>
              <button
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
                onClick={() => filterByStatus("Pending")}
              >
                Pending
              </button>
              <button
                onClick={() => filterByStatus("Completed")}
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Completed
              </button>
              <button
                onClick={() => filterByStatus("Work In Process")}
                className="bg-teal-600 text-white px-2 font-bold py-2 rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Work In Process
              </button>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <DataTable columns={colums} data={filteredTasks} pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default AlltaskList;
