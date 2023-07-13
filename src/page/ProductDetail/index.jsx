import React from "react";
import useQuery from "../../hook/useQuery";
import { productsServices } from "../../services/productsServices";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../constant/path";
import TopProductDetail from "./TopProductDetail";
import TapProductDetail from "./TapProductDetail";

const ProductDetail = () => {
  const { slug } = useParams();
  console.log("slug :>> ", slug);
  const { data } = useQuery(
    () => productsServices.getProductInfo(slug),
    [slug]
  );

  const { description, price, shippingReturn, rating, category } = data || {};
  console.log("data :>> ", data);
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container d-flex align-items-center">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={PATHS.INDEX}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={PATHS.PRODUCTS}>Product</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dark yellow lace
            </li>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <TopProductDetail {...data} />
          <TapProductDetail {...data} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
