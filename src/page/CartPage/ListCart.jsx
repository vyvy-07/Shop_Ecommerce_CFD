import React from "react";
import { formatCurrency } from "../../utils/format";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import QuantityInput from "../../components/QuantityInput";
const ListCart = ({
  product,
  handleRemoveCart,
  newListCard,
  onUpdateQuantity,
}) => {
  const { confirm } = Modal;
  const onUpdate = (e) => {
    console.log("first", e.target.value);
  };
  const showConfirm = (data) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p>${data?.name}</p>
          <p>
            {data?.quantity} * ${formatCurrency(data?.price)}
          </p>
        </>
      ),
      onOk() {
        handleRemoveCart(data?.id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div className="col-lg-9">
      <table className="table table-cart table-mobile">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {newListCard?.length > 0 &&
            newListCard?.map((item, index) => {
              return (
                <tr key={item?.id || index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <a href="#">
                          <img
                            src={
                              item?.images ||
                              "assets/images/demos/demo-3/products/product-6.jpg"
                            }
                            alt="Product image"
                          />
                        </a>
                      </figure>
                      <h3 className="product-title">
                        <a href="#">{item?.name}</a>
                      </h3>
                    </div>
                  </td>
                  <td className="price-col">${formatCurrency(item?.price)}</td>
                  <td className="quantity-col">
                    <QuantityInput
                      className="cart-product-quantity"
                      value={item?.quantity}
                      onChange={(value) => {
                        onUpdateQuantity?.(value, index);
                      }}
                    />
                  </td>
                  <td className="total-col">
                    $
                    {formatCurrency(
                      Number(item?.price || 0) * Number(item?.quantity || 0)
                    )}
                  </td>
                  <td className="remove-col">
                    <button className="btn-remove">
                      <i
                        className="icon-close"
                        onClick={() => showConfirm({ ...item })}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="cart-bottom">
        <div className="cart-discount">
          <form action="#">
            <div className="input-group">
              <input
                type="text"
                className="form-control input-error"
                required
                placeholder="Coupon code"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary-2" type="submit">
                  <i className="icon-long-arrow-right" />
                </button>
              </div>
            </div>
            <p className="form-error">Please fill in this field</p>
          </form>
        </div>
        <a href="#" className="btn btn-outline-dark-2">
          <span>UPDATE CART</span>
          <i className="icon-refresh" />
        </a>
      </div>
    </div>
  );
};

export default ListCart;
