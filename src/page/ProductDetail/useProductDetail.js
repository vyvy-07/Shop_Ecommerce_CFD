import React, { useEffect, useState } from "react";
import useQuery from "../../hook/useQuery";
import { ListReview } from "../../services/reviewServices";
import { useParams } from "react-router-dom";
import { productsServices } from "../../services/productsServices";

const useProductDetail = () => {
  const [idProduct, setIdProduct] = useState("");
  const [infoProduct, setInfoProduct] = useState({});
  const [dataReview, setDataReview] = useState([]);
  const { slug } = useParams();

  const getInfoProduct = async () => {
    try {
      const dataProducts = await productsServices.getProductInfo(slug);
      const dataProduct = dataProducts?.data?.data;
      setInfoProduct(dataProduct);
      if (dataProduct?.id) {
        setIdProduct(dataProduct?.id);
        getReview(dataProduct?.id);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getReview = async (id) => {
    try {
      if (id) {
        const dataReview = await ListReview.getReview(id);
        setDataReview(dataReview?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getInfoProduct();
  }, []);
  const tapContent = {
    idProduct,
    setIdProduct,
    ...infoProduct,
    dataReview,
  };
  return {
    tapContent,
    infoProduct,
  };
};

export default useProductDetail;
