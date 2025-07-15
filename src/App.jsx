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
import EmployeeSummary from "./components/employeedashboard/EmployeeSummary";
import HeadCookSummary from "./components/headcookdashboard/HeadCookSummary";
import HeadCookDashboard from "./pages/HeadCook/HeadCookDashboard";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import ManagerSummary from "./components/manager/ManagerSummary";
import VoyagerDashboard from "./pages/Voyager/VoyagerDashboard";
import VoyagerSummary from "./components/voyagers/VoyagerSummary";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AddMenus from "./components/menus/AddMenus";
import Item from "./components/menusitems/Item";
import AddTickets from "./components/tickets/AddTickets";
import StationeryOrderList from "./components/stationery/StationeryOrderList";
import CateringOrderList from "./components/catering/CateringOrderList";
import AdminMovieForm from "./components/tickets/AdminMovieForm";
import Orders from "./components/voyagers/Orders";
import OrderSummaryPage from "./components/voyagers/OrderSummaryPage";
import OrderSuccessPage from "./components/voyagers/OrderSuccessPage";
import ViewOrdersPage from "./components/voyagers/ViewOrdersPage";
import OrderList from "./components/orders/OrderList";
import OrderListById from "./components/orders/OrderListById";
import TicketBookingModel from "./components/tickets/TicketBookingModal"
import UserTicketBookingPage from "./components/tickets/UserTicketBookingPage";
import BookingList from "./components/tickets/BookingList";
import SalonBookingPage from "./components/salon/SalonBookingPage";
import CreateSalonPage from "./components/salon/CreateSalonPage";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* admin routes */}
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
              path="/admin-dashboard/menus"
              element={<AddMenus />}
            ></Route>

            <Route
              path="/admin-dashboard/items"
              element={<Item />}
            ></Route>
            <Route
              path="/admin-dashboard/tickets"
              element={<AdminMovieForm />}
            ></Route>

            <Route
              path="/admin-dashboard/fitness"
              element={<AddTickets />}
            ></Route>

            <Route
              path="/admin-dashboard/parties"
              element={<AdminMovieForm />}
            ></Route>
            <Route
              path="/admin-dashboard/order-list"
              element={<OrderList />}
            ></Route>
            <Route path="/admin-dashboard/salons" element={<CreateSalonPage />}></Route>

          </Route>

          {/* user route */}
          <Route
            path="/supervisor-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["admin"]}>
                  <EmployeeDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<EmployeeSummary />}></Route>
            <Route
              path="/supervisor-dashboard/stationery-orders"
              element={<StationeryOrderList />}
            ></Route>


          </Route>
          {/*Head Cook Routes*/}
          <Route
            path="/headcook-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["admin", "headcook"]}>
                  <HeadCookDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<HeadCookSummary />}></Route>
            <Route
              path="/headcook-dashboard/catering-orders"
              element={<CateringOrderList />}
            ></Route>

          </Route>

          {/*Manager Routes*/}
          <Route
            path="/manager-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["manager"]}>
                  <ManagerDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<ManagerSummary />}></Route>

          </Route>

          {/*Voyager Routes*/}
          <Route
            path="/voyager-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requireRole={["admin", "voyager"]}>
                  <VoyagerDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }
          >
            <Route index element={<VoyagerSummary />}></Route>
            <Route path="/voyager-dashboard/order-items" element={<Orders />} />
            <Route path="/voyager-dashboard/booking" element={<BookingList />} />
            <Route path="/voyager-dashboard/booking/movie-tickets" element={<UserTicketBookingPage />} />
            <Route path="/voyager-dashboard/order-summary" element={<OrderSummaryPage />} />
            <Route path="/voyager-dashboard/success" element={<OrderSuccessPage />} />
            <Route path="/voyager-dashboard/orders/:userId" element={<ViewOrdersPage />} />
            <Route path="/voyager-dashboard/order-list/:id" element={<OrderListById />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
