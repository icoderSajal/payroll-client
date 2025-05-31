import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { getAllEmployees } from "../../utils/EmployeeHelper";
import { Base_Url } from "../../service/Endpoints";

const EditEmployeeTask = () => {
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState({
    employeeId: "",
    taskType: "",
    startDate: "",
    endDate: "",
    comments: "",
    status: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await getAllEmployees();
      setEmployees(employees);
    };
    getEmployees();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/v1/task/edit/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          setTask(response.data.task);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          toast.error(error.response.data.error);
        }
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Base_Url}/api/v1/task/update/${id}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Task updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">
          Edit Employee Task
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Employee
              </label>
              <select
                name="employeeId"
                value={task.employeeId}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">--Select Employee--</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="taskType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Type
              </label>
              <select
                name="taskType"
                value={task.taskType}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
                required
              >
                <option value="">-- Select Task Type --</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Database">Database</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={task.startDate?.substring(0, 10)}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
                required
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={task.endDate?.substring(0, 10)}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
                required
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
                required
              >
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Work In Process">Work In Process</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="comments"
              rows="4"
              value={task.comments}
              onChange={handleChange}
              placeholder="Task Description"
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5"
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 items-center">
            <button
              type="submit"
              className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
            >
              Update Task
            </button>

            <Link
              className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
              to="/admin-dashboard/task"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeTask;
