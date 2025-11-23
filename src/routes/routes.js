import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import LoginPage from "../pages/client/Login/LoginPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { 
    path: "/login", element: <LoginPage />, isShowHeader: false
  },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
