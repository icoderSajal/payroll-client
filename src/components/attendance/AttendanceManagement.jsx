import { useEffect, useState } from "react";
import axios from "axios";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import { Base_Url } from "../../service/Endpoints";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AttendanceManagement = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    try {
      const emps = await getEmployees(e.target.value);
      setEmployees(emps);
    } catch (error) {}
  };
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${Base_Url}/api/v1/salary/add/`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Employee Salary Added");
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className=" md:p-6 lg:p-8 max-w-7xl mx-auto bg-white rounded-xl shadow-md p-4 mt-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Manage Employee Attendance
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>

                <select
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="department"
                  onChange={handleDepartment}
                >
                  <option value="">Select Department</option>
                  {departments?.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>

                <select
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="employeeId"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end items-end gap-2 mb-5 mt-4">
              <button
                to="/admin-dashboard/add-employee"
                className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Mark Attendance
              </button>
              <button
                onClick={() => navigate("/admin-dashboard")}
                className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};

export default AttendanceManagement;
