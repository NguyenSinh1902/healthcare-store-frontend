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
import AdminLogin from "../pages/admin/Login/LoginPage";
import AdminRegister from "../pages/admin/Register/RegisterPage";
import ProductPage from "../pages/admin/Product/ProductPage";
import AdminCategoryPage from "../pages/admin/Category/CategoryPage";
import AdminOrderPage from "../pages/admin/Order/OrderPage";
import AdminUserPage from "../pages/admin/User/UserPage";
import StaffPage from "../pages/admin/Staff/StaffPage";
import CouponPage from "../pages/admin/Coupon/CouponPage";
import AdminProfilePage from "../pages/admin/Profile/AdminProfilePage";

const routes = [
  { path: "/", element: <HomePage />, isShowHeader: true },

  { path: "/category/:id", element: <CategoryPage />, isShowHeader: true },

  { path: "/product-detail/:id", element: <ProductDetailPage />, isShowHeader: true },

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
  { path: "/admin/products", element: <ProductPage />, isShowHeader: false },
  { path: "/admin/categories", element: <AdminCategoryPage />, isShowHeader: false },
  { path: "/admin/orders", element: <AdminOrderPage />, isShowHeader: false },
  { path: "/admin/customers", element: <AdminUserPage />, isShowHeader: false },
  { path: "/admin/staff", element: <StaffPage />, isShowHeader: false },
  { path: "/admin/coupons", element: <CouponPage />, isShowHeader: false },
  { path: "/admin/profile", element: <AdminProfilePage />, isShowHeader: false },
  { path: "/admin/login", element: <AdminLogin />, isShowHeader: false },
  { path: "/admin/register", element: <AdminRegister />, isShowHeader: false },
];

export default routes;
