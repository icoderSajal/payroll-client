import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { colums } from "../../utils/SalaryHelper";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [salLoading, setSalLoading] = useState(false);
  const [fitersalaries, setFiltersalaries] = useState([]);

  const fetchDepartment = async () => {
    setSalLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/v1/salary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //console.log(response.data.salaries);
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.salaries.map((sal) => ({
          _id: sal._id,
          sno: sno++,
          employeeId: sal.employeeId.employeeId,
          basicSalary: sal.basicSalary,
          allowances: sal.allowances,
          deductions: sal.deductions,
          netSalary: sal.netSalary,
        }));

        setSalaries(data);
        setFiltersalaries(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    } finally {
      setSalLoading(false);
    }
  };

  //get department data
  useEffect(() => {
    fetchDepartment();
  }, []);
  

  const filterSalaries = (e) => {
    const data = salaries.filter((sal) =>
      sal.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFiltersalaries(data);
  };
  return (
    <>
      {salLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
              Employee Salary List
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              placeholder="Search By Department"
              type="text"
              onChange={filterSalaries}
              className="px-4 py-1 shadow-2xl h-12  border border-gray-300 rounded-2xl "
            />
            <Link
              to="/admin-dashboard/salary/add"
              className="bg-teal-500 text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
            >
              Add
            </Link>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-4">
            <DataTable columns={colums} data={fitersalaries} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryList;
