import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constant/path";
import FilterProduct from "./FilterProduct";
import ListProducts from "./ListProducts";
import Pagination from "./Pagination";
import Toolbox from "./Toolbox";

const Products = () => {
  //const { listProduct, loadingListProduct }= useProductsPage()
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
              <Toolbox />
              <ListProducts />
              <Pagination />
            </div>
            <aside className="col-lg-3 order-lg-first">
              <FilterProduct />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
