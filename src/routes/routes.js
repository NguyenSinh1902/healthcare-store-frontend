import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";

import AdminLogin from "../pages/admin/Login/LoginPage";
import AdminRegister from "../pages/admin/Register/RegisterPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },

  { path: "/admin/login", element: <AdminLogin />, isShowHeader: false },
  
  { path: "/admin/register", element: <AdminRegister />, isShowHeader: false },
];

export default routes;
