import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import LoadingPage from "../../components/Loading";
import Pagination from "../../components/Pagination";
import { PATHS } from "../../constant/path";
import FilterProduct from "./FilterProduct";
import ListProducts from "./ListProducts";
import Toolbox from "./Toolbox";
import useProductsPage from "./useProductsPage";

const Products = () => {
  const { productsProps, paginateProps, sortProps, filterProps, onChangePagi } =
    useProductsPage();

  const { loadingListProduct } = productsProps || {};
  if (loadingListProduct) {
    return (
      <main className="main">
        <LoadingPage />
      </main>
    );
  }

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>

      <Breadcrumb className={"mb-2"}>
        <Breadcrumb.Item>
          <Link to={PATHS.INDEX}>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item isActive={true}>Product</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <Toolbox {...sortProps} />
              <ListProducts {...productsProps} />
              <Pagination {...paginateProps} />
            </div>
            <aside className="col-lg-3 order-lg-first">
              <FilterProduct {...filterProps} />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
