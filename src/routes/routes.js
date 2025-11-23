import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import MyOrdersPage from "../pages/client/Account/MyOrders/MyOrdersPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { 
    path: "/account/orders", element: <MyOrdersPage />, isShowHeader: true 
  },


  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
