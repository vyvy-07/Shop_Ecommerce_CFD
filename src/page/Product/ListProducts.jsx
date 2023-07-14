import ProductItem from "../../components/ProductItem";

const ListProducts = ({ loadingListProduct, errorProduct, listProduct }) => {
  //if ((!loadingListProduct && listProduct?.length < 1) || errorProduct) {
  //  return (
  //    <div className="products mb-3">
  //      <div className="row justify-content-center">
  //        Product is currently not available!
  //      </div>
  //    </div>
  //  );
  //}

  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {listProduct?.length > 0 &&
          listProduct?.map((item, index) => {
            return (
              <div className="col-6 col-md-4 col-lg-4" key={item?.id || index}>
                <ProductItem {...item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListProducts;
