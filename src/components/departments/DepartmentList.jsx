import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { colums, DepartmentButtons } from "../../utils/Departmenthelper";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [fiterdepartments, setFilterdepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartment();
  };
  const fetchDepartment = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/department",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              Id={dep._id}
              onDepartmentDelete={onDepartmentDelete}
            />
          ),
        }));

        setDepartments(data);
        setFilterdepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };
  //get department data
  useEffect(() => {
    fetchDepartment();
  }, []);
  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterdepartments(records);
  };
  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="font-bold text-2xl">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              placeholder="Search By Department"
              type="text"
              onChange={filterDepartments}
              className="px-4 py-1 shadow-2xl h-12  border border-gray-300 rounded-2xl "
            />
            <Link
              to="/admin-dashboard/add-department"
              className="bg-teal-500 text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
            >
              Add New Department
            </Link>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-4">
            <DataTable columns={colums} data={fiterdepartments} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
