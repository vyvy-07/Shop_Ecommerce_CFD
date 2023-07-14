import React, { useEffect, useMemo } from "react";
import useQuery from "../../hook/useQuery";
import { productsServices } from "../../services/productsServices";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { SORT_OBJECT } from "../../constant/sort";

const useProductsPage = () => {
  const { search } = useLocation();
  const queryObj = queryString.parse(search);

  const [_, setUseSearchParams] = useSearchParams();

  //fetching api
  const LIMIT_PRODUCTS = 9;
  const {
    data: dataProducts,
    loading: loadingListProduct,
    error: errorProduct,
    refetch: refetchProduct,
  } = useQuery((query) =>
    productsServices.getListProduct(query || `?limit=${LIMIT_PRODUCTS}`)
  );
  const listProduct = dataProducts?.products || [];
  const paginationProducts = dataProducts?.pagination || {};

  const productsProps = {
    loadingListProduct,
    errorProduct,
    listProduct,
  };
  useEffect(() => {
    refetchProduct?.(search);
  }, [search]);
  //upDateQueryString
  const upDateQueryString = (queryObj) => {
    const newQueryString = queryString.stringify({
      ...queryObj,
      limit: LIMIT_PRODUCTS,
    });
    setUseSearchParams(new URLSearchParams(newQueryString));
  };
  //onChangePagi
  const onChangePagi = (page) => {
    upDateQueryString({ ...queryObj, page: page });
    console.log("page :>> ", page);
  };
  // trả về là string nên chuyển đổi thành Number!!
  const paginateProps = {
    page: Number(paginationProducts.page || queryObj.page || 1),
    total: Number(paginationProducts.total || 1),
    limit: Number(paginationProducts.limit || 1),
    onChangePagi,
  };

  // Sort

  const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OBJECT).find(
        (options) =>
          options.queryObj.order === queryObj.order &&
          options.queryObj.orderby === queryObj.orderby
      )?.value || SORT_OBJECT.popularity.value
    );
  }, [queryObj]);

  const onSortChange = (sortType) => {
    const sortQueryObj = SORT_OBJECT[sortType].queryObj;
    if (sortQueryObj) {
      upDateQueryString({ ...queryObj, ...sortQueryObj, page: 1 });
    }
  };
  const sortProps = {
    showNumber: listProduct?.length || 0,
    showPage: paginationProducts?.total || 0,
    activeSort,
    onSortChange,
  };
  //filter
  const {
    data: dataCategories,
    loading: loadCategory,
    error: errorCategory,
  } = useQuery(() => productsServices.getCategories());
  let listCategory = dataCategories?.products;
  //console.log("listCategory :>> ", listCategory);
  const filterProps = {
    loadCategory,
    listCategory,
    errorCategory,
  };
  return {
    listCategory,
    productsProps,
    paginateProps,
    sortProps,
    filterProps,
    onChangePagi,
  };
};

export default useProductsPage;
