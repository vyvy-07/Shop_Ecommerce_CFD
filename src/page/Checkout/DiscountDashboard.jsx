import { styled } from "styled-components";
import ButtonItem from "../../components/Button";
import { useState } from "react";
const ContainerCoupon = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
  .checkout-discount {
    flex: 1;
  }
`;
const DiscountDashboard = ({
  discount,
  handleAddCoupon,
  handleRemoveCoupon,
}) => {
  const [coupon, setCoupon] = useState("");
  const getValue = (e) => {
    setCoupon(e.target.value);
  };
  const onAddCoupon = () => {
    // call api
    if (coupon) {
      handleAddCoupon(coupon);
    }
  };
  const onRemoveCoupon = () => {
    if (discount) {
      handleRemoveCoupon(discount);
      onClear();
    }
  };
  const onClear = () => {
    setCoupon("");
  };
  return (
    <ContainerCoupon>
      <div className="checkout-discount">
        <form>
          <input
            type="text"
            className="form-control"
            value={coupon || ""}
            id="checkout-discount-input"
            onChange={getValue}
          />
          <label htmlFor="checkout-discount-input" className="text-truncate">
            Have a coupon? <span>Click here to enter your code</span>
          </label>
        </form>
      </div>
      {discount ? (
        <ButtonItem variant="primary" onClick={onRemoveCoupon}>
          Remove
        </ButtonItem>
      ) : (
        <ButtonItem variant="primary" onClick={onAddCoupon}>
          Add
        </ButtonItem>
      )}
    </ContainerCoupon>
  );
};

export default DiscountDashboard;
