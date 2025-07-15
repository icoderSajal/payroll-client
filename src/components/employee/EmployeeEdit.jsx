import { useEffect, useState } from "react";
import axios from "axios";
import { fetchDepartments } from "../../utils/EmployeeHelper";

import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Base_Url } from "../../service/Endpoints";
const EmployeeEdit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${Base_Url}/api/v1/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee?.userId?.name,
            maritalStatus: employee?.maritalStatus,
            designation: employee?.designation,
            department: employee?.department,
            salary: employee?.salary,
          }));
        } else {
          toast.error("Failed to fetch employee data.");
        }
      } catch (error) {
        if (error.response && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("An error occurred while fetching data.");
        }
      } finally {
        //setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${Base_Url}/api/v1/employee/${id}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Employee Updated");
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
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-[#00000] backdrop-blur p-8 rounded-md shadow-md">
          <h2 className="text-4xl font-bold text-center text-teal-50 mb-8">
            Update Employee
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  name="name"
                  value={employee?.name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>

                <select
                  name="maritalStatus"
                  value={employee?.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select Status</option>
                  <option value="married">Married</option>
                  <option value="unmarried">Unmarried</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  placeholder="Designation"
                  type="text"
                  value={employee?.designation}
                  name="designation"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>

                <select
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="department"
                  value={employee?.department}
                  onChange={handleChange}
                >
                  <option value={employee?.department?.dep_name}>
                    Select Department
                  </option>
                  {departments?.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  placeholder="Salary"
                  type="text"
                  name="salary"
                  value={employee?.salary}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 items-center">
              <button
                type="submit"
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300 uppercase"
              >
                Update
              </button>
              <Link
                className="bg-teal-600 text-white px-2 py-2 font-bold rounded-lg hover:bg-teal-800 transition duration-300 uppercase"
                to="/admin-dashboard/employees"
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

export default EmployeeEdit;
