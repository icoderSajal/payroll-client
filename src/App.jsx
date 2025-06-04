import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import EmployeeDashboard from "./pages/User/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/departments/DepartmentList";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import EmployeeView from "./components/employee/EmployeeView";
import EmployeeEdit from "./components/employee/EmployeeEdit";
import SalaryView from "./components/salary/SalaryView";
import AddEmployeeSalary from "./components/salary/AddEmployeeSalary";
import EmployeeSummary from "./components/employeedashboard/EmployeeSummary";
import EmployeeLeavesList from "./components/leaves/EmployeeLeavesList";
import AddEmployeeLeaves from "./components/leaves/AddEmployeeLeaves";
import EmployeeSetting from "./components/employeeSetting/EmployeeSetting";
import LeaveManagement from "./components/leaves/LeaveManagement";
import LeaveDetails from "./components/leaves/LeaveDetails";
import EmployeeAttendance from "./components/attendance/EmployeeAttendance";
import AttendanceManagement from "./components/attendance/AttendanceManagement";
import AttendanceReport from "./components/reports/AttendanceReport";
import AddAttendance from "./components/attendance/AddAttendance";
import AddEmployeeTask from "./components/tasks/AddEmployeeTask";
import EmployeeTaskList from "./components/tasks/EmployeeTaskList";
import AlltaskList from "./components/tasks/AlltaskList";
import EmployeeTaskDetails from "./components/tasks/EmployeeTaskDetails";
import EditEmployeeTask from "./components/tasks/EditEmployeeTask";
import SalaryList from "./components/salary/SalaryList";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<AdminSummary />}></Route>
            <Route
              path="/admin-dashboard/departments"
              element={<DepartmentList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-department"
              element={<AddDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/department/:id"
              element={<EditDepartment />}
            ></Route>
            <Route
              path="/admin-dashboard/employees"
              element={<EmployeeList />}
            ></Route>
            <Route
              path="/admin-dashboard/add-employee"
              element={<AddEmployee />}
            ></Route>
            <Route
              path="/admin-dashboard/employee/:id"
              element={<EmployeeView />}
            ></Route>
            <Route
              path="/admin-dashboard/employee/edit/:id"
              element={<EmployeeEdit />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salaries"
              element={<SalaryList />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/salary/:id"
              element={<SalaryView />}
            ></Route>
            <Route
              path="/admin-dashboard/salary/add"
              element={<AddEmployeeSalary />}
            ></Route>
            <Route
              path="/admin-dashboard/leaves"
              element={<LeaveManagement />}
            ></Route>
            <Route
              path="/admin-dashboard/setting/:id"
              element={<EmployeeSetting />}
            ></Route>
            <Route
              path="/admin-dashboard/leave/detail/:id"
              element={<LeaveDetails />}
            ></Route>
            <Route
              path="/admin-dashboard/employees/leaves/:id"
              element={<EmployeeLeavesList />}
            ></Route>
            <Route
              path="/admin-dashboard/attendance"
              element={<AddAttendance />}
            ></Route>
            <Route
              path="/admin-dashboard/reports"
              element={<AttendanceReport />}
            ></Route>

            <Route
              path="/admin-dashboard/task"
              element={<AlltaskList />}
            ></Route>
            <Route
              path="/admin-dashboard/task/add"
              element={<AddEmployeeTask />}
            ></Route>
            <Route
              path="/admin-dashboard/task/:id"
              element={<EditEmployeeTask />}
            ></Route>
          </Route>

          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["admin", "employee"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<EmployeeSummary />}></Route>
            <Route
              path="/employee-dashboard/profile/:id"
              element={<EmployeeView />}
            ></Route>
            <Route
              path="/employee-dashboard/attendance/:id"
              element={<EmployeeAttendance />}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/:id"
              element={<EmployeeLeavesList />}
            ></Route>
            <Route
              path="/employee-dashboard/leaves/add"
              element={<AddEmployeeLeaves />}
            ></Route>
            <Route
              path="/employee-dashboard/salary/:id"
              element={<SalaryView />}
            ></Route>
            <Route
              path="/employee-dashboard/setting/:id"
              element={<EmployeeSetting />}
            ></Route>
            <Route
              path="/employee-dashboard/task/:id"
              element={<EmployeeTaskList />}
            ></Route>
            <Route
              path="/employee-dashboard/task/detail/:id"
              element={<EmployeeTaskDetails />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
