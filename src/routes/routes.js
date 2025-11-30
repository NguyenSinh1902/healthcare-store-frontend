import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import AdminOrderPage from "../pages/admin/Order/OrderPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },

    { path: "/admin/orders", element: <AdminOrderPage />, isShowHeader: false },
];

export default routes;
