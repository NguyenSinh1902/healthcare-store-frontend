import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import ProductPage from "../pages/admin/Product/ProductPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },

  { path: "/admin/products", element: <ProductPage />, isShowHeader: false },
];

export default routes;
