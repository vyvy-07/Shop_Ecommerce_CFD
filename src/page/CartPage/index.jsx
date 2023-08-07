import React from "react";
import CartTotal from "./CartTotal";
import ListCart from "./ListCart";
import useCartPage from "./useCartPage";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constant/path";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartTotal, listCart } = useCartPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.INDEX}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCTS}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
      </Breadcrumb>

      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <ListCart {...listCart} />
              <CartTotal {...cartTotal} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
