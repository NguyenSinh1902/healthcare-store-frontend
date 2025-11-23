import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import AccountDetailsPage from "../pages/client/Account/AccountDetails/AccountDetailsPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/account/details", element: <AccountDetailsPage />, isShowHeader: true },

  { path: "/account", element: <AccountDetailsPage />, isShowHeader: true },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
