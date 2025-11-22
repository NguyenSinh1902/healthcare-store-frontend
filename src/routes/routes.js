import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import CategoryPage from "../pages/client/Category/Category";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

   { path: "/category", element: <CategoryPage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
