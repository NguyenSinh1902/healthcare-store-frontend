import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import OrderPage from "../pages/client/Order/OrderPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/order", element: <OrderPage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
