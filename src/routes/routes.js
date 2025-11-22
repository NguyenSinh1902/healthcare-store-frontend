import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import CartPage from "../pages/client/Cart/CartPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/cart", element: <CartPage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
