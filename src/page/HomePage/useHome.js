import React, { useMemo, useState } from "react";
import useQuery from "../../hook/useQuery";
import { productsServices } from "../../services/productsServices";
import LoadingPage from "../../components/Loading";

export const HOT_TAB = {
  feature: "feature",
  sale: "on-sale",
  top: "top-rated",
};
const useHome = () => {
  const {
    data: dataProducts,
    loading: loadingProducts,
    error: errorProducts,
  } = useQuery(() => productsServices.getListProduct());
  const listProducts = dataProducts?.products;

  //HotTab section
  const [selectHotTab, setSelectHotTab] = useState(HOT_TAB.feature);
  const hotProductsProps = useMemo(() => {
    let hotProducts = [];
    switch (selectHotTab) {
      case HOT_TAB.feature:
        hotProducts = listProducts?.filter((products) => products.featured);
        break;
      case HOT_TAB.sale:
        hotProducts = listProducts?.filter((products) => products.onSale);
        break;

      case HOT_TAB.top:
        hotProducts = listProducts?.filter((products) => products.topRated);

        break;
      default:
        hotProducts = [];
        break;
    }
    return {
      hotProducts,
      selectHotTab,
      onSelectHotTab: setSelectHotTab,
    };
  }, [listProducts, selectHotTab]);
  //dataCategories
  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useQuery(() => productsServices.getCategories());
  const listCategories = dataCategories?.products || [];
  //featureProduct
  const [selectedCategories, setSelectedCategories] = useState("all");
  const categoriesProps = useMemo(() => {
    const featureProduct =
      selectedCategories == "all"
        ? [...(listProducts || [])]
        : listProducts?.filter(
            (item) => item?.category?.slug === selectedCategories
          );
    return {
      featureProduct,
      listCategories: [{ name: "All", slug: "all" }, ...listCategories],
      selectedCategories,
      onSetSelected: (slug) => {
        setSelectedCategories(slug);
      },
    };
  }, [listProducts, selectedCategories, setSelectedCategories, listCategories]);

  return {
    listProducts,
    loadingCategories,
    loadingProducts,
    hotProductsProps,
    categoriesProps,
  };
};

export default useHome;
