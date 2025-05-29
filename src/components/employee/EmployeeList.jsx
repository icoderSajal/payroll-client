import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { colums, EmployeeButtons } from "../../utils/EmployeeHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter employees by department name
  const handleFilterChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = employees.filter((emp) =>
      emp.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
  };

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://payroll-server-1.onrender.com/api/v1/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(data.success.employees);
        if (data.success) {
          let sno = 1;
          const empData = await data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                className="rounded-full"
                width={40}
                src={`https://payroll-server-1.onrender.com/${emp.userId.profileImage}`}
                alt={`${emp.userId.name}'s profile`}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(empData);
          setFilteredEmployees(empData);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to fetch employee data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl md:text-3xl">Manage Employees</h3>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-5">
            <input
              type="text"
              placeholder="Search by Department"
              onChange={handleFilterChange}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="bg-teal-600 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition duration-300"
            >
              Add New Employee
            </Link>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <DataTable columns={colums} data={filteredEmployees} pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
