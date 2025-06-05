import { useEffect, useState } from "react";
import axios from "axios";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Base_Url } from "../../service/Endpoints";
const AddEmployeeSalary = () => {
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
        `${Base_Url}/api/v1/salary/add`,
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
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">
            Add Employee Salary
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {/* basic salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  placeholder="Monthly Basic Salary"
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Allowances */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  placeholder="Monthly Allowances"
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  placeholder="Monthly Deductions"
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* PayDate */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PayDate
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
            <div className="flex justify-end gap-4 items-center mt-5">
              <button
                type="submit"
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
              >
                Add Salary
              </button>
              <Link
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300"
                to="/admin-dashboard/employees/salaries"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </>
  );
};

export default AddEmployeeSalary;
