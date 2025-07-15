import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import toast from "react-hot-toast";
import { colums, EmployeeButtons } from "../../utils/EmployeeHelper";
import { Base_Url } from "../../service/Endpoints";
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
      setTimeout(async () => {
        try {
          const { data } = await axios.get(`${Base_Url}/api/v1/employee`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
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
                  src={`${Base_Url}/${emp.userId.profileImage}`}
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
      }, 2000);
      ///////////
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-teal-700 font-semibold">
              Loading Users...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-4xl font-bold text-center text-teal-50 mb-8">
              Manage  Users
            </h3>
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
              Add New User
            </Link>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-4">

            <DataTable columns={colums} data={filteredEmployees} pagination />
          </div>

        </>
      )}
    </div>
  );
};

export default EmployeeList;
