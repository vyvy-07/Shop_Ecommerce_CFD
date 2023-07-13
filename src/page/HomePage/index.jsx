import React from "react";
import IntroSection from "./IntroSection";
import DealSection from "./DealSection";
import FeaturedProduct from "./FeaturedProduct";
import Services from "./Services";
import SendCoupon from "./SendCoupon";
import BranchName from "./BranchName";
import useHome from "./useHome";
import HotProducts from "./HotProducts";
import LoadingPage from "../../components/Loading";
import useDebounce from "../../hook/useDebounce";

const HomePage = () => {
  const {
    hotProductsProps,
    loadingProducts,
    categoriesProps,
    loadingCategories,
  } = useHome();
  const pageLoading = useDebounce(loadingCategories || loadingProducts, 300);
  if (pageLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="main">
      <IntroSection />
      <HotProducts {...hotProductsProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection />
      <BranchName />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeaturedProduct {...categoriesProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <Services />
      <SendCoupon />
    </main>
  );
};

export default HomePage;
