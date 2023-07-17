import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { PATHS } from "../../constant/path";
import { authActions } from "../../store/reducers/authReducer";
import { useAuthen } from "../AuthenContext";
import { clearCard } from "../../store/reducers/cartsReducer";

const HeaderTop = () => {
  const { openModal } = useAuthen();
  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authActions.logout());
    dispatch(clearCard() || null);
  };
  return (
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
  );
};

export default HeaderTop;
