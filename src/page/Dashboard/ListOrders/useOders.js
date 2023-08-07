import { useState } from "react";
import { useSelector } from "react-redux";

const useOders = () => {
  const { listOrder } = useSelector((state) => state.order);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProdcut, setIdProdcut] = useState("");
  const [idOrder, setIdOrder] = useState("");

  const modal = {
    isModalOpen,
    setIsModalOpen,
    setIdProdcut,
    idProdcut,
    idOrder,
    setIdOrder,
  };
  return {
    listOrder,
    modal,
  };
};

export default useOders;
