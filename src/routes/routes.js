import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import AdminUserPage from "../pages/admin/User/UserPage";
import StaffPage from "../pages/admin/Staff/StaffPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },

  { path: "/admin/customers", element: <AdminUserPage />, isShowHeader: false },

  { path: "/admin/staff", element: <StaffPage />, isShowHeader: false },
];

export default routes;
