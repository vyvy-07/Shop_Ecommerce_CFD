import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../assets/style.css";
import { AuthenProvider } from "../components/AuthenContext";
import ModalLayouts from "../components/AuthenModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MenuMobile from "../components/MenuMobile";
import ButonScrollToTop from "../components/ButtonScrollToTop";
import MainJS from "../assets/js/main";

const Mainlayouts = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    return document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);
  //thêm main.js vào cho lần  render đầu tiên
  useEffect(() => {
    //const script = document.createElement("script");
    //script.src = "/assets/js/main.js";
    //document.body.appendChild(script);
    const myTime = setTimeout(() => {
      MainJS();
    }, 500);

    return () => clearTimeout(myTime);
  }, [pathname]);

  return (
    <AuthenProvider>
      <div class="page-wrapper">
        {/* header */}
        <Header />
        {/* main */}
        <Outlet />
        {/* footer */}
        <Footer />
      </div>
      <ButonScrollToTop />
      <MenuMobile />
      <ModalLayouts />
    </AuthenProvider>
  );
};

export default Mainlayouts;
