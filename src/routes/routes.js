import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import LoginPage from "../pages/client/Login/LoginPage";
import RegisterPage from "../pages/client/Register/RegisterPage";

import AdminLogin from "../pages/admin/Login/LoginPage";
import AdminRegister from "../pages/admin/Register/RegisterPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { 
    path: "/login", element: <LoginPage />, isShowHeader: false
  },

  { 
    path: "/register", element: <RegisterPage />, isShowHeader: false
  },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },

  { path: "/admin/login", element: <AdminLogin />, isShowHeader: false },
  
  { path: "/admin/register", element: <AdminRegister />, isShowHeader: false },
];

export default routes;
