import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
