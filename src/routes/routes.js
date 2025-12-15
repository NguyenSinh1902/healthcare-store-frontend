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
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PaymentSuccessPage from "../pages/client/Payment/PaymentSuccessPage";
import PaymentFailedPage from "../pages/client/Payment/PaymentFailedPage";
import AdminPaymentPage from "../pages/admin/Payment/PaymentPage";

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

  // Payment Routes
  { path: "/payment/success", element: <PaymentSuccessPage />, isShowHeader: true },
  { path: "/payment/failed", element: <PaymentFailedPage />, isShowHeader: true },

  {
    path: "/login", element: <LoginPage />, isShowHeader: false
  },

  {
    path: "/register", element: <RegisterPage />, isShowHeader: false
  },

  // Protected Admin Routes
  { path: "/admin", element: <ProtectedRoute><Dashboard /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/products", element: <ProtectedRoute><ProductPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/categories", element: <ProtectedRoute><AdminCategoryPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/orders", element: <ProtectedRoute><AdminOrderPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/customers", element: <ProtectedRoute><AdminUserPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/staff", element: <ProtectedRoute><StaffPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/coupons", element: <ProtectedRoute><CouponPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/payment", element: <ProtectedRoute><AdminPaymentPage /></ProtectedRoute>, isShowHeader: false },
  { path: "/admin/profile", element: <ProtectedRoute><AdminProfilePage /></ProtectedRoute>, isShowHeader: false },

  // Public Admin Routes
  { path: "/admin/login", element: <AdminLogin />, isShowHeader: false },
  { path: "/admin/register", element: <AdminRegister />, isShowHeader: false },

  // 404 Route
  { path: "*", element: <NotFoundPage />, isShowHeader: false },
];


export default routes;
