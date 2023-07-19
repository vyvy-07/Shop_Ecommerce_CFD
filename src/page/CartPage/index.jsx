import React from "react";
import CartTotal from "./CartTotal";
import ListCart from "./ListCart";
import useCartPage from "./useCartPage";

const CartPage = () => {
  const { cartTotal } = useCartPage();
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
      <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="product.html">Product</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <ListCart />
              <CartTotal {...cartTotal} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
