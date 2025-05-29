import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useEffect } from "react";

const AttendanceReport = () => {
  const [formData, setFormData] = useState({
    reportType: "",
    startDate: "",
    endDate: "",
  });
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attreport, setAttreport] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //alert(JSON.stringify(formData));
    const url = "https://payroll-server-1.onrender.com/api/v1/admin-report/get";
    try {
      const res = await axios.get(url, formData);
      setReportData(res.data.data);
      console.log(JSON.stringify(res));
    } catch (err) {
      console.error("Error fetching report", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAtt = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/admin-report/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data.atts;
      console.log(data);

      setAttreport(data);
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchAtt();
  }, []);
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `${formData.reportType.replace(" ", "_")}_Report.xlsx`);
  };

  return (
    <div className="max-w-full mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Report Request Form
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="reportType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Report Type
              </label>
              <select
                id="reportType"
                name="reportType"
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
                onChange={handleChange}
                required
              >
                <option value="">-- Select Report Type --</option>
                <option value="Attendance Report">Attendance Report</option>
                <option value="Leave Report">Leave Report</option>
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
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
                onChange={handleChange}
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
                className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-teal-500 focus:border-teal-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 gap-4">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-900 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            >
              Load Report
            </button>
            {reportData.length > 0 && (
              <button
                type="button"
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
              >
                Export Excel
              </button>
            )}
          </div>
        </form>

        <div className="bg-red-200 p-6 mt-6 mx-auto">
          {attreport?.map((rep) => (
            <ul className="bg-amber-200 p-4" key={rep._id}>
              <li>{rep._id}</li>
              <li>{rep.name}</li>
              <li>{rep.employeeId}</li>
              <li>{rep.loginTime}</li>
              <li>{rep.logoutTime}</li>
              <li>{rep.hoursWorked}</li>
              <li>{rep.status}</li>
            </ul>
          ))}
        </div>
        {/* Loading Skeleton */}
        {loading && (
          <div className="mt-8 animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        )}

        {/* Report Table */}
        {reportData.length > 0 && !loading && (
          <div className="mt-8 overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  {Object.keys(reportData[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 font-medium text-gray-700 border"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-4 py-2 border">
                        {val?.toString()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;
