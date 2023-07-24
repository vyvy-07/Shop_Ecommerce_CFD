import React from "react";
import Summary from "./Summary";
import FormCheckout from "./FormCheckout";
import useCheckout from "./useCheckout";
import { Input } from "../../components/InputItem";

const Checkout = () => {
  const { summary, formCheckout, cardInfo } = useCheckout();
  const { register, errors } = formCheckout || {};
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
              Checkout
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <div
              className="coupon"
              style={{ display: "flex", maxHeight: "40px" }}
            >
              <div className="checkout-discount" style={{ width: "340px" }}>
                <div action="#">
                  <Input
                    required
                    id="checkout-discount-input"
                    {...register("discount", {
                      // required: "Please fill in this field!",
                    })}
                    error={errors?.discount?.message || ""}
                  />

                  <label
                    htmlFor="checkout-discount-input"
                    className="text-truncate"
                  >
                    Have a coupon? <span>Click here to enter your code</span>
                  </label>
                </div>
              </div>
              <button className="btn btn-primary">
                <span>{"ADD COUPON"}</span>
              </button>
            </div>
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
