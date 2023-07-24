import { useDispatch, useSelector } from "react-redux";
import { OPTION_RADIO } from "../../constant/radio";
import { message } from "antd";
import { GENERAL_MESSAGE } from "../../constant/message";
import THUNK_STATUS from "../../constant/thunkStatus";
import { updateCard } from "../../store/reducers/cartsReducer";
import { useState } from "react";

const useCartPage = () => {
  const { cardInfo, updateStatus } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [listQuantity, setListQuantity] = useState({});
  let payLoadShipping = {};
  const onUpdate = async (value) => {
    const selectedValue = OPTION_RADIO?.find((item) => item?.value === value);
    console.log("selectedValue", selectedValue);
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
  const handleRemoveCart = async (id) => {
    if (id && updateStatus !== THUNK_STATUS.pending) {
      try {
        let newPayLoad = {};
        // tìm vtri index
        const indexID = cardInfo?.product.findIndex((item) => item?.id == id);

        if (indexID > -1) {
          const newListCart = cardInfo?.product.filter(
            (item) => item?.id !== id
          );
          const listIdCart = newListCart?.map((item) => item?.id);
          const newQuantity = [...cardInfo?.quantity];
          const newListQuantty = newQuantity?.filter((item, index) => {
            return index !== indexID;
          });
          newPayLoad = {
            product: listIdCart,
            quantity: newListQuantty,
          };
        }

        await dispatch(updateCard(newPayLoad));
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const newListCard = cardInfo?.product?.map((item, index) => {
    return { ...item, quantity: cardInfo?.quantity[index] };
  });
  const onUpdateQuantity = async (value, indexUpdate) => {
    if (cardInfo.id && updateStatus !== THUNK_STATUS.pending) {
      try {
        let payload = {};

        const quantitySelect = newListCard?.map((item, index) => {
          return indexUpdate === index
            ? {
                ...item,
                quantity: value,
              }
            : { ...item };
        });
        const productPayload = cardInfo?.product?.map((item) => item?.id);
        const quantityPayload = quantitySelect?.map((item) =>
          item?.quantity.toString()
        );
        if (productPayload && quantityPayload) {
          payload = {
            product: productPayload,
            quantity: quantityPayload,
          };
          console.log("payload", payload);
        }
        const res = await dispatch(updateCard(payload)).unwrap();
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const listCart = {
    ...cardInfo,
    newListCard,
    handleRemoveCart,
    onUpdateQuantity,
  };

  return {
    cartTotal,
    listCart,
  };
};

export default useCartPage;
