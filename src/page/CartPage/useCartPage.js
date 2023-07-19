import { useDispatch, useSelector } from "react-redux";
import { OPTION_RADIO } from "../../constant/radio";
import { message } from "antd";
import { GENERAL_MESSAGE } from "../../constant/message";
import THUNK_STATUS from "../../constant/thunkStatus";
import { updateCard } from "../../store/reducers/cartsReducer";

const useCartPage = () => {
  const { cardInfo, updateStatus } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let payLoadShipping = {};
  const onUpdate = async (value) => {
    const selectedValue = OPTION_RADIO?.find((item) => item?.value === value);
    const listIdProduct = cardInfo?.product.map((item) => item?.id);
    if (
      cardInfo?.id &&
      updateStatus !== THUNK_STATUS.pending &&
      selectedValue
    ) {
      try {
        payLoadShipping = {
          ...cardInfo,
          product: listIdProduct,
          shipping: {
            typeShip: selectedValue?.value,
            price: selectedValue?.price,
          },
        };
        await dispatch(updateCard(payLoadShipping)).unwrap();
      } catch (error) {
        console.log("error", error);
        message.error(GENERAL_MESSAGE.fail);
      }
    }
  };
  const cartTotal = {
    ...cardInfo,
    onUpdate,
  };
  return {
    cartTotal,
  };
};

export default useCartPage;
