import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constant/path";
import { authActions } from "../../store/reducers/authReducer";
import { useAuthen } from "../AuthenContext";
import ButtonItem from "../Button";

const Header = () => {
  const { openModal } = useAuthen();
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <a href="tel:0989596912">
              <i className="icon-phone" /> Hotline: 098 9596 912{" "}
            </a>
          </div>
          <div className="header-right">
            {/* Not LogIn */}
            {!profile && (
              <ul className="top-menu top-link-menu">
                <li>
                  <p
                    onClick={openModal}
                    className="top-menu-login"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="icon-user" />
                    Login | Resgister{" "}
                  </p>
                </li>
              </ul>
            )}
            {/* Logged In */}
            {profile && (
              <ul class="top-menu">
                <li>
                  <Link end to={PATHS.DASHBOARD} class="top-link-menu">
                    <i class="icon-user"></i>
                    {profile?.firstName || "Guest"}
                  </Link>
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <NavLink end to={PATHS.DASHBOARD}>
                            Account Details
                          </NavLink>
                        </li>
                        <li>
                          <NavLink end to={PATHS.DASHBOARD_ORDERS}>
                            Your Orders
                          </NavLink>
                        </li>
                        <li>
                          <NavLink end to={PATHS.DASHBOARD_WISHLISH}>
                            Wishlist <span>(3)</span>
                          </NavLink>
                        </li>
                        <li>
                          <a
                            role="button"
                            style={{ cursor: "pointer" }}
                            onClick={onLogout}
                          >
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
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
              <a
                href="#"
                className="search-toggle"
                role="button"
                title="Search"
              >
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
                <span className="cart-count">2</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-cart-products">
                  <div className="product">
                    <div className="product-cart-details">
                      <h4 className="product-title">
                        <a href="product-detail.html">
                          Beige knitted elastic runner shoes
                        </a>
                      </h4>
                      <span className="cart-product-info">
                        <span className="cart-product-qty">1</span> x $84.00{" "}
                      </span>
                    </div>
                    <figure className="product-image-container">
                      <a href="product-detail.html" className="product-image">
                        <img
                          src="assets/images/products/cart/product-1.jpg"
                          alt="product"
                        />
                      </a>
                    </figure>
                    <a href="#" className="btn-remove" title="Remove Product">
                      <i className="icon-close" />
                    </a>
                  </div>
                  <div className="product">
                    <div className="product-cart-details">
                      <h4 className="product-title">
                        <a href="product-detail.html">
                          Blue utility pinafore denim dress
                        </a>
                      </h4>
                      <span className="cart-product-info">
                        <span className="cart-product-qty">1</span> x $76.00{" "}
                      </span>
                    </div>
                    <figure className="product-image-container">
                      <a href="product-detail.html" className="product-image">
                        <img
                          src="assets/images/products/cart/product-2.jpg"
                          alt="product"
                        />
                      </a>
                    </figure>
                    <a href="#" className="btn-remove" title="Remove Product">
                      <i className="icon-close" />
                    </a>
                  </div>
                </div>
                <div className="dropdown-cart-total">
                  <span>Total</span>
                  <span className="cart-total-price">$160.00</span>
                </div>
                <div className="dropdown-cart-action">
                  <Link to={PATHS.CART} className="btn btn-primary">
                    View Cart
                  </Link>
                  <Link to={PATHS.CHECK} className="btn btn-outline-primary-2">
                    <span>Checkout</span>
                    <i className="icon-long-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
