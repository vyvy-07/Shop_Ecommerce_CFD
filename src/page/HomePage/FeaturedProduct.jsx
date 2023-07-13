import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import ProductItem from "../../components/ProductItem";
import { styled } from "styled-components";

const FeaturedProduct = ({
  featureProduct,
  listCategories,
  onSetSelected,
  selectedCategories,
}) => {
  const [renderProduct, setRenderProduct] = useState([]);
  useEffect(() => {
    setRenderProduct(featureProduct);
  }, [featureProduct]);

  const onChangeTab = (slug) => {
    if (slug !== selectedCategories) {
      setRenderProduct([]);
      console.log("slug :>> ", slug);
      const newTime = setTimeout(() => {
        onSetSelected?.(slug);
      }, 300);
    }
  };

  return (
    <div className="container top" style={{ minHeight: 560 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {listCategories?.length > 0 &&
              listCategories?.map((item, index) => {
                const { name, slug } = item || {};
                return (
                  <li className="nav-item" key={item?.slug || index}>
                    <a
                      onClick={() => onChangeTab(item?.slug)}
                      className={`nav-link ${
                        item?.slug == selectedCategories ? "active" : ""
                      }`}
                    >
                      {item?.name}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          className={`tab-pane p-0 fade ${renderProduct ? "show active" : ""}`}
          style={{ minHeight: 405 }}
        >
          {renderProduct?.length > 0 && (
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
              {renderProduct?.length > 0 &&
                renderProduct?.map((item, index) => {
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

export default FeaturedProduct;
