//import { Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PATHS } from "./constant/path";
import Dashboard from "./layouts/DashboardLayout";
import Mainlayouts from "./layouts/Mainlayouts";
import AboutPage from "./page/About";
import BlogPage from "./page/Blog";
import BlogSingle from "./page/BlogSingle";
import CartPage from "./page/CartPage";
import Checkout from "./page/Checkout";
import CheckoutSuccess from "./page/Checkout-success";
import ContactPage from "./page/Contact";
import Addresses from "./page/Dashboard/Addresses";
import Orders from "./page/Dashboard/ListOrders";
import Profile from "./page/Dashboard/Profile";
import Wishlist from "./page/Dashboard/Wishlist";
import FaqPage from "./page/Faq";
import HomePage from "./page/HomePage";
import Page404 from "./page/Page404";
import PaymentPage from "./page/PaymentMethod";
import Privacy from "./page/PrivacyPolicy";
import Products from "./page/Product";
import ProductDetail from "./page/ProductDetail";
import Returns from "./page/Returns";
import Shipping from "./page/Shipping";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainlayouts />}>
          <Route index element={<HomePage />} />

          <Route element={<PrivateRoute redirectPath={PATHS.INDEX} />}>
            <Route path={PATHS.DASHBOARD} element={<Dashboard />}>
              <Route index element={<Profile />} />
              <Route path={PATHS.DASHBOARD_ORDERS} element={<Orders />} />
              <Route path={PATHS.DASHBOARD_ADDRESSES} element={<Addresses />} />
              <Route path={PATHS.DASHBOARD_WISHLISH} element={<Wishlist />} />
            </Route>
            <Route path={PATHS.CHECK_SUCCESS} element={<CheckoutSuccess />} />
            <Route path={PATHS.CHECK} element={<Checkout />} />
            <Route path={PATHS.CART} element={<CartPage />} />
          </Route>

          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.BLOG} element={<BlogPage />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogSingle />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.FAQ} element={<FaqPage />} />
          <Route path={PATHS.RETURN} element={<Returns />} />
          <Route path={PATHS.SHIPPING} element={<Shipping />} />
          <Route path={PATHS.PAYMENT} element={<PaymentPage />} />
          <Route path={PATHS.PRIVACY} element={<Privacy />} />
          <Route path={PATHS.PRODUCTS} element={<Products />} />
          <Route path={PATHS.PRODUCTS_DETAIL} element={<ProductDetail />} />
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
