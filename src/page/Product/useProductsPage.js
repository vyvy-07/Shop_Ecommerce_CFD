import React from "react";
import useQuery from "../../hook/useQuery";
import { productsServices } from "../../services/productsServices";

const useProductsPage = () => {
  //fetching api

  const {
    data: dataProducts,
    loading: loadingListProduct,
    refetch: refetchProduct,
  } = useQuery(() => productsServices.getListProduct());
  const listProduct = dataProducts?.products;

  return {
    listProduct,
    loadingListProduct,
  };
};

export default useProductsPage;
