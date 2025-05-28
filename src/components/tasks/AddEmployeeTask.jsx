import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import { getAllEmployees } from "../../utils/EmployeeHelper";

const AddEmployeeTask = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employeeId: null,
    taskType: "",
    startDate: "",
    endDate: "",
    comments: "",
  });

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await getAllEmployees();
      setEmployees(employees);
    };
    getEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/task/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Task Added");
        navigate("/admin-dashboard/task");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Create Employee Tasks
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Employee
              </label>
              <select
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                name="employeeId"
                onChange={handleChange}
                required
              >
                <option value="">--Select Employee--</option>
                {employees?.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="leaveType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Task Type
              </label>
              <select
                id="taskType"
                name="taskType"
                value={formData.taskType}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
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
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
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
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
                required
              />
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
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="4"
              placeholder="Task Description"
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 items-center">
            <button
              type="submit"
              className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
            >
              Add Task
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

export default AddEmployeeTask;
