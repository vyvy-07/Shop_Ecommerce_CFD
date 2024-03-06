import { Link } from "react-router-dom";
import { PATHS } from "../../constant/path";
import TapProductDetail from "./TapProductDetail";
import TopProductDetail from "./TopProductDetail";
import useProductDetail from "./useProductDetail";
import Breadcrumb from "../../components/Breadcrumb";
import BreadcrumbItem from "antd/es/breadcrumb/BreadcrumbItem";

const ProductDetail = () => {
  const { tapContent } = useProductDetail();
  return (
    <main className="main">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={PATHS.INDEX}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={PATHS.PRODUCTS}>Product</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive>Dark yellow lace</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <TopProductDetail {...tapContent} />
          <TapProductDetail {...tapContent} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
