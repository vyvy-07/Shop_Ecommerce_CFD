import Radio from "../../components/Radio";
import { Link } from "react-router-dom";
import { PATHS } from "../../constant/path";
import { formatCurrency } from "../../utils/format";
import { OPTION_RADIO } from "../../constant/radio";

const CartTotal = ({ total, subTotal, shipping, onUpdate }) => {
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>${formatCurrency(subTotal)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>

            <Radio.Group onChange={onUpdate} defaultValue={shipping?.typeShip}>
              {OPTION_RADIO?.length > 0 &&
                OPTION_RADIO.map((item) => {
                  const { value, label, price } = item || {};
                  return (
                    <tr className="summary-shipping-row" key={item?.value}>
                      <td>
                        <Radio.Item value={value}>{label}</Radio.Item>
                      </td>
                      <td>${price}</td>
                    </tr>
                  );
                })}
            </Radio.Group>

            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.DASHBOARD}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>${formatCurrency(total)}</td>
            </tr>
          </tbody>
        </table>
        <Link
          to={PATHS.CHECK}
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          PROCEED TO CHECKOUT
        </Link>
      </div>
      <Link
        to={PATHS.PRODUCTS}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Link>
    </aside>
  );
};

export default CartTotal;
