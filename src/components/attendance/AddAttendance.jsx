import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { colums } from "../../utils/AttendanceHelper";

const AdminAddAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attreport, setAttreport] = useState([]);
  const [attendance, setAttendance] = useState({
    employeeId: "",
    name: "",
    loginTime: "",
    logoutTime: "",
    date: "",
    status: "Present",
    hoursWorked: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "https://payroll-server-1.onrender.com/api/v1/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEmployees(res.data.employees || []);
      } catch {
        toast.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const { loginTime, logoutTime } = attendance;
    if (loginTime && logoutTime) {
      const start = new Date(loginTime);
      const end = new Date(logoutTime);
      const diff = (end - start) / (1000 * 60 * 60);
      setAttendance((prev) => ({
        ...prev,
        hoursWorked: diff > 0 ? diff.toFixed(2) : "0.00",
      }));
    }
  }, [attendance.loginTime, attendance.logoutTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "employeeId") {
      const selectedEmp = employees.find((emp) => emp.employeeId === value);
      if (selectedEmp) {
        setAttendance((prev) => ({
          ...prev,
          name: selectedEmp.userId.name,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...attendance,
      loginTime:
        attendance.status === "Present"
          ? attendance.loginTime
          : attendance.date,
      logoutTime:
        attendance.status === "Present" ? attendance.logoutTime : null,
      hoursWorked: attendance.status === "Present" ? attendance.hoursWorked : 0,
    };

    try {
      const res = await axios.post(
        "https://payroll-server-1.onrender.com/api/v1/attendance/manual",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Attendance added successfully");
        setAttendance({
          employeeId: "",
          name: "",
          loginTime: "",
          logoutTime: "",
          date: "",
          status: "Present",
          hoursWorked: "",
        });
        fetchAtt(); // refresh report after add
      } else {
        toast.error("Failed to add attendance");
      }
    } catch {
      toast.error("Error adding attendance");
    }
  };

  const fetchAtt = async () => {
    try {
      const response = await axios.get(
        "https://payroll-server-1.onrender.com/api/v1/admin-report/get",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const data = response.data.atts.map((rep) => ({
          _id: rep._id,
          sno: sno++,
          empId: rep.employeeId,
          name: rep.name,

          attDate: new Date(rep.loginTime).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),

          loginTime: new Date(rep.loginTime).toLocaleTimeString(),
          logoutTime: rep.logoutTime
            ? new Date(rep.logoutTime).toLocaleTimeString()
            : "N/A",
          workingHours: rep.hoursWorked,
          status: rep.status,
        }));
        setAttreport(data);
      }
    } catch (error) {
      toast.error("Failed to load attendance report");
    }
  };

  useEffect(() => {
    fetchAtt();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(attreport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Attendance_Report.xlsx");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-12">
      <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">
        Admin Panel - Employee Attendance
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Employee
            </label>
            <select
              name="employeeId"
              value={attendance.employeeId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp.employeeId}>
                  {emp.employeeId} - {emp.userId.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Attendance Status
            </label>
            <select
              name="status"
              value={attendance.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
        </div>

        {attendance.status === "Present" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Login Time
              </label>
              <input
                type="datetime-local"
                name="loginTime"
                value={attendance.loginTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Logout Time
              </label>
              <input
                type="datetime-local"
                name="logoutTime"
                value={attendance.logoutTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Worked Hours
              </label>
              <input
                type="text"
                name="hoursWorked"
                value={attendance.hoursWorked}
                readOnly
                className="w-full px-4 py-2 bg-gray-100 border rounded-lg"
              />
            </div>
          </div>
        )}

        {(attendance.status === "Absent" || attendance.status === "Leave") && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={attendance.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg shadow transition duration-200"
          >
            Submit Attendance
          </button>

          <button
            type="button"
            onClick={exportToExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition duration-200"
          >
            Export to Excel
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          Attendance Records
        </h3>
        <div className="bg-white rounded-xl overflow-x-auto shadow-md">
          <DataTable columns={colums} data={attreport} pagination />
        </div>
      </div>
    </div>
  );
};

export default AdminAddAttendance;
