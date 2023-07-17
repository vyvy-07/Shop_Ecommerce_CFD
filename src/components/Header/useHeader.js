import { useSelector } from "react-redux";

export const useHeader = () => {
  const { cardInfo } = useSelector((state) => state.cart);

  const products = {
    products: cardInfo?.product?.map((item, index) => {
      return { ...item, quantity: cardInfo?.quantity[index] || "1" };
    }),
  };
  const onRemoveProduct = () => {};
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
