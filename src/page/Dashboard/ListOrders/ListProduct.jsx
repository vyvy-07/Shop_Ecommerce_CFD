import { styled } from "styled-components";
import { formatCurrency } from "../../../utils/format";
const WrapInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 18px;
  .title-info {
    font-size: 16px;
    font-weight: bold;
  }
`;
const ListProduct = ({
  id,
  total,
  discount,
  subTotal,
  address,
  note,
  shipping,
  product,
  isReview,
  quantity,
  setIsModalOpen,
  setIdProdcut,
  setIdOrder,
}) => {
  const handleReview = (idproduct) => {
    setIsModalOpen(true);
    setIdProdcut(idproduct);
    setIdOrder(id);
  };
  return (
    <>
      <WrapInfo>
        <label>
          {" "}
          <span className="title-info">Name:</span> {address?.fullName}
        </label>
        <label>
          <span className="title-info">Email:</span> {address?.email}
        </label>
        <label>
          <span className="title-info">Phone:</span> {address?.phone}
        </label>
        <label>
          <span className="title-info">Address:</span> {address?.ward}
        </label>
        <label>
          <span className="title-info">Note:</span> {note || ""}
        </label>
        <label>
          <span className="title-info">Shipping:</span> {shipping?.typeShip}
        </label>
      </WrapInfo>
      <table
        className="table table-cart table-mobile"
        style={{ border: "none" }}
      >
        <thead>
          <tr>
            <th style={{ border: "none" }}> Product</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {product?.length
            ? product?.map((item, index) => (
                <tr key={item?.id}>
                  <td className="product-col" style={{ border: "none" }}>
                    <div className="product" style={{ background: "initial" }}>
                      <figure className="product-media">
                        <a href="#">
                          <img src={item?.images[0]} alt="Product image" />
                        </a>
                      </figure>
                      <h3 className="product-title">
                        <a href="#">{item.name}</a>
                        {!isReview[index] && (
                          <div
                            className="nav-dashboard reviewOrder"
                            onClick={() => handleReview(item?.id)}
                            style={{ cursor: "pointer", border: "none" }}
                          >
                            <p
                              className="nav-link active"
                              style={{ border: "none" }}
                            >
                              Review
                            </p>
                          </div>
                        )}
                      </h3>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    ${formatCurrency(item?.price)}
                  </td>
                  <td className="quantity-col text-center">
                    {/* {quantity[index] || quantity[0]} */}
                    {quantity.length === product?.length
                      ? quantity[index]
                      : "1"}{" "}
                  </td>
                  <td className="total-col text-center">
                    {" "}
                    $
                    {quantity[index] &&
                      formatCurrency(quantity[index] * product[index]?.price)}
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
        <div className="orderPrice">
          <div className="wrapInfo price">
            <label style={{ margin: " 0 20px" }}>
              SubTotal: <strong>{subTotal}$</strong>{" "}
            </label>
            <label style={{ margin: " 0 20px" }}>
              Discount: <strong>{discount}$</strong>{" "}
            </label>
            <label style={{ margin: " 0 20px" }}>
              Total: <strong>{total}$</strong>{" "}
            </label>
          </div>
        </div>
      </table>
    </>
  );
};
export default ListProduct;
