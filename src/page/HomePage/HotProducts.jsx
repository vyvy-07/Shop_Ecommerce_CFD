import React, { useEffect, useState } from "react";
import ProductItem from "../../components/ProductItem";
import OwlCarousel from "react-owl-carousel";
import { HOT_TAB } from "./useHome";

const HotProducts = ({ hotProducts, selectHotTab, onSelectHotTab }) => {
  const [renderProps, setRenderProps] = useState([]);
  useEffect(() => {
    setRenderProps(hotProducts);
  }, [hotProducts]);
  const onChangeTab = (tab) => {
    if (tab !== selectHotTab) {
      setRenderProps([]);
      setTimeout(() => {
        onSelectHotTab?.(tab);
      }, 400);
    }
  };
  return (
    <div className="container featured" style={{ minHeight: 550 }}>
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        role="tablist"
      >
        <li className="nav-item">
          <a
            onClick={() => onChangeTab(HOT_TAB.feature)}
            className={`nav-link ${
              selectHotTab === HOT_TAB.feature ? "active" : ""
            }`}
          >
            Featured
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => onChangeTab(HOT_TAB.sale)}
            className={`nav-link ${
              selectHotTab === HOT_TAB.sale ? "active" : ""
            }`}
          >
            On Sale
          </a>
        </li>
        <li className="nav-item">
          <a
            onClick={() => onChangeTab(HOT_TAB.top)}
            className={`nav-link ${
              selectHotTab === HOT_TAB.top ? "active" : ""
            }`}
          >
            Top Rated
          </a>
        </li>
      </ul>
      <div className="tab-content tab-content-carousel">
        <div
          className={`tab-pane p-0 fade ${renderProps ? "show active" : ""}`}
        >
          {renderProps?.length > 0 && (
            <OwlCarousel
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              nav
              margin={20}
              responsive={{
                0: { items: 2 },
                600: { items: 2 },
                992: { items: 3 },
                1200: { items: 4 },
              }}
            >
              {renderProps?.length > 0 &&
                renderProps?.map((item, index) => {
                  return (
                    <ProductItem
                      key={item?.id || index}
                      {...item}
                      item={item}
                    />
                  );
                })}
            </OwlCarousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotProducts;
