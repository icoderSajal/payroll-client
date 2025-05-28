import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const WORK_HOUR_LIMIT = 9; // 9 hours limit

const EmployeeAttendance = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    userId: user._id,
    employeeId: "",
    name: "",
    loginTime: "",
    logoutTime: "",
    status: "Present",
  });

  const [attendanceId, setAttendanceId] = useState(null);
  const [loginTimer, setLoginTimer] = useState("0.00");
  const [startTime, setStartTime] = useState(null);
  const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch employee on load
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const employeeData = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            employeeId: employeeData?.employeeId,
            name: employeeData?.userId?.name,
            designation: employeeData?.designation,
          }));
        } else {
          toast.error("Failed to fetch employee data.");
        }
      } catch (error) {
        toast.error("Error fetching employee data.");
      }
    };

    fetchEmployee();
  }, [id]);

  // Restore attendance session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ongoingAttendance");
    if (saved) {
      const session = JSON.parse(saved);
      setAttendanceId(session.attendanceId);
      setStartTime(new Date(session.loginTime));
      setEmployee((prev) => ({
        ...prev,
        loginTime: session.loginTime,
      }));
      setIsAttendanceStarted(true);
    }
  }, []);

  // Live timer effect
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diffHrs = (now - new Date(startTime)) / (1000 * 60 * 60);
        setLoginTimer(diffHrs.toFixed(2));

        // Auto-stop at 9 hours
        if (diffHrs >= WORK_HOUR_LIMIT) {
          handleEndAttendanceAuto(now.toISOString());
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTime]);

  // Handle both start & end in same button
  const handleAttendanceClick = async () => {
    if (!isAttendanceStarted) {
      await handleStartAttendance();
    } else {
      await handleEndAttendanceManual();
    }
  };

  const handleStartAttendance = async () => {
    try {
      const now = new Date().toISOString();

      const payload = {
        userId: user._id,
        employeeId: employee.employeeId,
        name: employee.name,
        loginTime: now,
        status: "Present",
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/attendance/start",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Attendance started.");
        const id = response.data.attendance._id;
        setAttendanceId(id);
        setStartTime(new Date(now));
        setEmployee((prev) => ({ ...prev, loginTime: now }));
        setIsAttendanceStarted(true);

        localStorage.setItem(
          "ongoingAttendance",
          JSON.stringify({ attendanceId: id, loginTime: now })
        );
      }
    } catch (error) {
      toast.error("Failed to start attendance.");
    }
  };

  const handleEndAttendanceManual = async () => {
    const logoutTime = new Date().toISOString();
    await updateAttendance(logoutTime);
  };

  const handleEndAttendanceAuto = async (logoutTime) => {
    toast.success("9 hours completed. Auto-logged out.");
    await updateAttendance(logoutTime);
  };

  const updateAttendance = async (logoutTime) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/attendance/logout/${attendanceId}`,
        { logoutTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Attendance recorded successfully.");
        setIsAttendanceStarted(false);
        localStorage.removeItem("ongoingAttendance");
        navigate("/employee-dashboard");
      }
    } catch (error) {
      toast.error("Failed to update attendance.");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="font-bold text-2xl md:text-3xl">Mark Attendance</h3>
            {isAttendanceStarted && (
              <div className="text-md font-semibold text-green-700">
                🕒 Working Hours: {loginTimer} hrs (running)
              </div>
            )}
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee Id
                </label>
                <input
                  type="text"
                  value={employee?.employeeId}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={employee?.name}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Timer
                </label>
                <input
                  type="text"
                  value={`${loginTimer} hrs`}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100"
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleAttendanceClick}
                className={`px-6 py-2 rounded-lg text-white transition duration-300 ${
                  isAttendanceStarted
                    ? "bg-red-600 hover:bg-red-800"
                    : "bg-green-600 hover:bg-green-800"
                }`}
              >
                {isAttendanceStarted ? "End Attendance" : "Start Attendance"}
              </button>

              <button
                onClick={() => navigate("/employee-dashboard")}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Back
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeAttendance;
