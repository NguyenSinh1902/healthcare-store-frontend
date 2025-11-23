import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import ProductDetailPage from "../pages/client/ProductDetail/ProductDetailPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/product-detail", element: <ProductDetailPage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
