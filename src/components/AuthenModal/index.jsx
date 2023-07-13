import cn from "classnames";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuthen } from "../AuthenContext";
import { LOCAL_STOGARE } from "../../constant/localStogare";
const ModalLayouts = () => {
  const { isOpenAuthenModal, closeModal, tab, setTab, ...props } = useAuthen();

  if (!isOpenAuthenModal) {
    return <></>;
  }
  return (
    <>
      <div
        className={`modal fade ${!!isOpenAuthenModal ? "show" : ""}`}
        style={{ display: isOpenAuthenModal ? "block" : "none" }}
        onClick={closeModal}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body">
              <button
                type="button"
                className="close"
                onClick={closeModal}
                style={{ zIndex: 1000 }}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item" onClick={() => setTab("login")}>
                      <a
                        className={cn("nav-link", { active: tab === "login" })}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item" onClick={() => setTab("register")}>
                      <a
                        className={cn("nav-link", {
                          active: tab === "register",
                        })}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {tab === "login" && <LoginForm {...props} />}
                    {tab === "register" && <RegisterForm {...props} />}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
      </div>
      <div
        class={`${isOpenAuthenModal ? "modal-backdrop fade show" : ""}`}
        onClick={closeModal}
      />
    </>
  );
};

export default ModalLayouts;
