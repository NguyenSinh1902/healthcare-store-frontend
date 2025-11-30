import DashboardPage from "../pages/admin/Dashboard/DashboardPage";
import HomePage from "../pages/client/HomePage/HomePage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <DashboardPage />, isShowHeader: false },
];

export default routes;
