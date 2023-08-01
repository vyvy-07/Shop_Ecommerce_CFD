import React from "react";
import cn from "classnames";
import { formatCurrency } from "../../utils/format";
import { Link, Navigate } from "react-router-dom";
import { PATHS } from "../../constant/path";
import { PAYMENTMETHOD } from "../../constant/globalConstant";

const Summary = ({
  id,
  subTotal,
  total,
  listProduct,
  shipping,

  onChangePayment,
  paymentMethod,
  onPlaceOrder,
}) => {
  console.log("paymentMethod", paymentMethod);
  const isCash = paymentMethod === PAYMENTMETHOD.cash;
  console.log("isCash", isCash);
  const isCard = paymentMethod === PAYMENTMETHOD.card;
  return (
    <aside className="col-lg-3">
      <div className="summary">
        <h3 className="summary-title">Your Order</h3>
        <table className="table table-summary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {listProduct?.length > 0 &&
              listProduct?.map((item, index) => {
                return (
                  <tr key={item?.id || index}>
                    <td>
                      <a href="#">
                        {item?.name} * {item?.quantity}
                      </a>
                    </td>
                    <td>${formatCurrency(item?.price * item?.quantity)}</td>
                  </tr>
                );
              })}

            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${formatCurrency(subTotal)}</td>
            </tr>
            <tr>
              <td>Shipping:</td>

              {shipping ? (
                <>
                  <td>
                    {shipping?.typeShip}: ${shipping?.price}
                  </td>
                </>
              ) : (
                <td>
                  <td>
                    <Link
                      to={PATHS.CART}
                      style={{
                        whiteSpace: "nowrap",
                        color: "#0000ff",
                        textDecoration: "revert",
                      }}
                    >
                      select shipping
                    </Link>
                  </td>
                </td>
              )}
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <div className="accordion-summary" id="accordion-payment">
          <div className="card">
            <div
              className="card-header"
              onClick={() => onChangePayment(PAYMENTMETHOD.card)}
              id="heading-1"
            >
              <h2 className="card-title">
                <a className={isCard ? "" : "collapsed"}>
                  {" "}
                  Direct bank transfer{" "}
                </a>
              </h2>
            </div>
            <div
              // id="collapse-1"
              className={`collapse ${isCard && "show"}`}
            >
              <div className="card-body">
                {" "}
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.{" "}
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header"
              onClick={() => onChangePayment(PAYMENTMETHOD.cash)}
              id="heading-3"
            >
              <h2 className="card-title">
                <a className={!isCash && "collapsed"}> Cash on delivery </a>
              </h2>
            </div>
            <div className={cn("collapse", { isCash: "show" })}>
              <div className="card-body">
                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros.{" "}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary-2 btn-order btn-block"
          onClick={onPlaceOrder}
        >
          <span className="btn-text">Place Order</span>
          <span className="btn-hover-text">Proceed to Checkout</span>
        </button>
      </div>
    </aside>
  );
};

export default Summary;
