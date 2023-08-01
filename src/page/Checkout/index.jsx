import React, { useEffect } from "react";
import Summary from "./Summary";
import FormCheckout from "./FormCheckout";
import useCheckout from "./useCheckout";
import { Input } from "../../components/InputItem";
import DiscountDashboard from "./DiscountDashboard";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constant/path";
import { Link, NavLink, Navigate } from "react-router-dom";

const Checkout = () => {
  const { summary, cardInfo, formCheckout, form, discountDashboard } =
    useCheckout();
  const {
    register,
    formState: { errors },
  } = form || {};

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>

      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.INDEX}>Home</Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive> Checkout</Breadcrumb.Item>
      </Breadcrumb>

      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <DiscountDashboard {...discountDashboard} />
            <div action="#" className="checkout-form">
              <div className="row">
                <FormCheckout {...formCheckout} />
                <Summary {...summary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
