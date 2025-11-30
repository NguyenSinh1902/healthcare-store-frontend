import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import AdminCategoryPage from "../pages/admin/Category/CategoryPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },

  { path: "/admin/categories", element: <AdminCategoryPage />, isShowHeader: false },
];

export default routes;
