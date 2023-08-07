import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrder } from "../../../store/reducers/orderReducer";
import Emty from "./Emty";
import MyOrder from "./MyOrder";
import useOders from "./useOders";

const Orders = () => {
  const { listOrder, modal } = useOders();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder());
  }, []);
  return (
    <>
      {listOrder ? <MyOrder listOrder={listOrder} modal={modal} /> : <Emty />}
    </>
  );
};

export default Orders;
