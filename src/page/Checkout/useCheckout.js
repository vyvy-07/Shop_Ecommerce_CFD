import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const useCheckout = () => {
  const { cardInfo } = useSelector((state) => state.cart);
  const listProduct = cardInfo?.product?.map((item, index) => {
    return {
      ...item,
      quantity: cardInfo?.quantity[index],
    };
  });
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const summary = {
    ...cardInfo,
    listProduct,
    handleSubmit,
  };

  const formCheckout = {
    ...cardInfo,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  };
  return {
    summary,
    formCheckout,
  };
};

export default useCheckout;
