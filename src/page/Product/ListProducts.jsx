import React from "react";
import useProductsPage from "./useProductsPage";
import LoadingPage from "../../components/Loading";
import ProductItem from "../../components/ProductItem";

const ListProducts = () => {
  const { listProduct, loadingListProduct } = useProductsPage();

  if (loadingListProduct) {
    return (
      <main className="main">
        <LoadingPage />
      </main>
    );
  }
  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {listProduct?.length > 0 &&
          listProduct?.map((item, index) => {
            return (
              <div className="col-6 col-md-4 col-lg-4" key={item?.id || index}>
                <ProductItem key={item?.id || index} {...item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListProducts;
