import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { colums } from "../../utils/SalaryHelper";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_Url } from "../../service/Endpoints";

const SalaryList = () => {
  const [salaries, setSalaries] = useState([]);
  const [salLoading, setSalLoading] = useState(true);
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  const fetchSalaries = async () => {
    setSalLoading(true);
    try {
      const response = await axios.get(`${Base_Url}/api/v1/salary`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.salaries.map((sal) => ({
          _id: sal._id,
          sno: sno++,
          employeeId: sal.employeeId.employeeId,
          basicSalary: sal.basicSalary,
          allowances: sal.allowances,
          deductions: sal.deductions,
          netSalary: sal.netSalary,
        }));

        // Simulate a 2-second loading effect
        setTimeout(() => {
          setSalaries(data);
          setFilteredSalaries(data);
          setSalLoading(false);
        }, 2000);
      }
    } catch (error) {
      setSalLoading(false);
      toast.error(error.response?.data?.error || "Failed to fetch salary data");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = salaries.filter((sal) =>
      sal.employeeId.toLowerCase().includes(value)
    );
    setFilteredSalaries(filtered);
  };

  return (
    <>
      {salLoading ? (
        <div className="p-5 animate-pulse">
          <div className="text-center mb-8">
            <div className="h-8 w-64 mx-auto bg-gray-200 rounded-lg"></div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="h-10 w-1/3 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-4">
            <table className="min-w-full">
              <thead>
                <tr className="h-12">
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="px-4 py-2">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b h-12">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-4 py-2">
                        <div className="h-4 w-full bg-gray-100 rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-center text-teal-700 mb-8">
              Employee Salary List
            </h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              placeholder="Search by Employee ID"
              type="text"
              onChange={filterSalaries}
              className="px-4 py-1 shadow-2xl h-12 border border-gray-300 rounded-2xl"
            />
            <Link
              to="/admin-dashboard/salary/add"
              className="bg-teal-500 text-white py-2.5 px-4 rounded hover:bg-teal-900 hover:ring-2 transition-all duration-300"
            >
              Add
            </Link>
          </div>
          <div className="overflow-x-auto bg-white rounded-xl shadow-md mt-4">
            <DataTable columns={colums} data={filteredSalaries} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryList;
