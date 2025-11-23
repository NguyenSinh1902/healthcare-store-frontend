import Dashboard from "../pages/admin/Dashboard/Dashboard";
import HomePage from "../pages/client/HomePage/HomePage";
import CategoryPage from "../pages/client/Category/Category";
import ProductDetailPage from "../pages/client/ProductDetail/ProductDetailPage";
import CartPage from "../pages/client/Cart/CartPage";
import OrderPage from "../pages/client/Order/OrderPage";
import OrderSuccessPage from "../pages/client/OrderSuccess/OrderSuccessPage";
import AccountDetailsPage from "../pages/client/Account/AccountDetails/AccountDetailsPage";
import MyOrdersPage from "../pages/client/Account/MyOrders/MyOrdersPage";
import LoginPage from "../pages/client/Login/LoginPage";
import RegisterPage from "../pages/client/Register/RegisterPage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/category", element: <CategoryPage />, isShowHeader: true },

  { path: "/product-detail", element: <ProductDetailPage />, isShowHeader: true },

  { path: "/cart", element: <CartPage />, isShowHeader: true },

  { path: "/order", element: <OrderPage />, isShowHeader: true },

  { path: "/order-success", element: <OrderSuccessPage />, isShowHeader: true },

  { path: "/account/details", element: <AccountDetailsPage />, isShowHeader: true },

  { 
    path: "/account/orders", element: <MyOrdersPage />, isShowHeader: true 
  },

  { 
    path: "/account", element: <AccountDetailsPage />, isShowHeader: true 
  },

  { 
    path: "/login", element: <LoginPage />, isShowHeader: false
  },

  { 
    path: "/register", element: <RegisterPage />, isShowHeader: false
  },

  { path: "/admin", element: <Dashboard />, isShowHeader: false },
];

export default routes;
