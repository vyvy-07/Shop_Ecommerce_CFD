import { useDispatch, useSelector } from "react-redux";
import { getCard, updateCard } from "../../store/reducers/cartsReducer";
import { message } from "antd";
import { CART_MESSAGE } from "../../constant/message";

export const useHeader = () => {
  const { cardInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const products = {
    products: cardInfo?.product?.map((item, index) => {
      return { ...item, quantity: cardInfo?.quantity[index] || "1" };
    }),
  };
  const onRemoveProduct = async (id) => {
    try {
      let payload = {};
      if (id) {
        const findIndex = cardInfo?.product?.findIndex(
          (item) => item?.id == id
        );
        if (findIndex > -1) {
          const listProduct = cardInfo?.product?.map((item) => item?.id);
          const newList = listProduct?.filter((item) => item !== id);
          const listQuantity = [...cardInfo?.quantity];
          const newListQuantity = listQuantity?.filter(
            (_, index) => index !== findIndex
          );
          payload = {
            ...cardInfo,
            product: newList,
            quantity: newListQuantity,
            subTotal: 0,
            total: 0,
            totalProduct: ["string"],
          };
        }
      }
      console.log("payload", payload);
      const res = await dispatch(updateCard(payload)).unwrap();
      if (res.id) {
        dispatch(getCard());
        message.success(CART_MESSAGE.delete);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const headerMiddle = {
    ...cardInfo,
    products,
    onRemoveProduct,
  };
  return {
    headerMiddle,
  };
};

// export default useHeader;
