import React from "react";
import { formatCurrency } from "../../utils/format";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant/path";

const Summary = ({
  id,
  subTotal,
  total,
  listProduct,
  shipping,
  handleSubmit,
}) => {
  const onSubmit = (data) => {
    console.log(data);
  };
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
              listProduct?.map((item) => {
                return (
                  <tr>
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
            <div className="card-header" id="heading-1">
              <h2 className="card-title">
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapse-1"
                  aria-expanded="true"
                  aria-controls="collapse-1"
                >
                  {" "}
                  Direct bank transfer{" "}
                </a>
              </h2>
            </div>
            <div
              id="collapse-1"
              className="collapse show"
              aria-labelledby="heading-1"
              data-parent="#accordion-payment"
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
            <div className="card-header" id="heading-3">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse-3"
                  aria-expanded="false"
                  aria-controls="collapse-3"
                >
                  {" "}
                  Cash on delivery{" "}
                </a>
              </h2>
            </div>
            <div
              id="collapse-3"
              className="collapse"
              aria-labelledby="heading-3"
              data-parent="#accordion-payment"
            >
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
          onClick={handleSubmit(onSubmit)}
        >
          <span className="btn-text">Place Order</span>
          <span className="btn-hover-text">Proceed to Checkout</span>
        </button>
      </div>
    </aside>
  );
};

export default Summary;
