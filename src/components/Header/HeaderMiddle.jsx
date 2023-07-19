import React from "react";
import ButtonItem from "../Button";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constant/path";
import { formatCurrency } from "../../utils/format";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
const HeaderMiddle = ({
  subTotal,
  products,
  totalProduct,
  onRemoveProduct,
}) => {
  const listProduct = products?.products;
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const showConfirm = (item) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <p>{`${item?.name}`}</p>
          <p>{`${item?.quantity} * $${formatCurrency(item?.price)}`}</p>
        </>
      ),
      onOk() {
        onRemoveProduct?.(item?.id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <ButtonItem
            className="mobile-menu-toggler"
            onClick={() => {
              document.body.classList.add("mmenu-active");
            }}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </ButtonItem>
          <NavLink end to={PATHS.INDEX} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </NavLink>
        </div>
        <nav className="main-nav">
          <ul className="menu">
            <li>
              <NavLink end to={PATHS.INDEX}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <div className="header-search">
            <a href="#" className="search-toggle" role="button" title="Search">
              <i className="icon-search" />
            </a>
            <form action="#" method="get">
              <div className="header-search-wrapper">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Search in..."
                  required
                />
              </div>
            </form>
          </div>
          <div className="dropdown cart-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <i className="icon-shopping-cart" />
              {totalProduct > 0 ? (
                <span className="cart-count">{totalProduct}</span>
              ) : (
                ""
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-cart-products">
                {listProduct?.length > 0
                  ? listProduct?.map((item, index) => {
                      return (
                        <div className="product" key={item?.id || index}>
                          <div className="product-cart-details">
                            <h4 className="product-title">
                              <Link
                                to={PATHS.PRODUCTS_DETAIL.replace(
                                  ":slug",
                                  item?.slug
                                )}
                              >
                                {item?.name}
                              </Link>
                            </h4>
                            <span className="cart-product-info">
                              <span className="cart-product-qty">
                                {item?.quantity} *
                              </span>{" "}
                              ${formatCurrency(item?.price)}{" "}
                            </span>
                          </div>
                          <figure className="product-image-container">
                            <Link
                              to={PATHS.PRODUCTS_DETAIL.replace(
                                ":slug",
                                item?.slug
                              )}
                            >
                              <img
                                src="assets/images/products/cart/product-1.jpg"
                                alt="product"
                              />
                            </Link>
                          </figure>
                          <a
                            // href="#"
                            className="btn-remove"
                            title="Remove Product"
                            onClick={() => showConfirm({ ...item })}
                          >
                            <i
                              className="icon-close"
                              // onClick={showConfirm({ ...item })}
                            />
                          </a>
                        </div>
                      );
                    })
                  : "No product in there!"}
              </div>
              <div className="dropdown-cart-total">
                <span>Total: {totalProduct || 0}</span>
                <span className="cart-total-price">
                  ${formatCurrency(subTotal)}
                </span>
              </div>
              {!!listProduct?.length > 0 && (
                <div className="dropdown-cart-action">
                  <Link to={PATHS.CART} className="btn btn-primary">
                    View Cart
                  </Link>
                  <Link to={PATHS.CHECK} className="btn btn-outline-primary-2">
                    <span>Checkout</span>
                    <i className="icon-long-arrow-right" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
