import React from "react";
import CheckedItem from "../../components/Checked";

const FilterProduct = ({ listCategory, onChangeFilter }) => {
  //const onChangeFilter = (id, checked) => {
  //  if (checked) {
  //    onChangeFilter?.(id);
  //  } else {
  //    onChangeFilter?.("");
  //  }
  //};
  return (
    <div className="sidebar sidebar-shop">
      <div className="widget widget-clean">
        <label>Filters:</label>
        <a href="#" className="sidebar-filter-clear">
          Clean All
        </a>
      </div>
      <div className="widget widget-collapsible">
        <h3 className="widget-title">
          <a
            data-toggle="collapse"
            href="#widget-1"
            role="button"
            aria-expanded="true"
            aria-controls="widget-1"
          >
            {" "}
            Category{" "}
          </a>
        </h3>
        <div className="collapse show" id="widget-1">
          <div className="widget-body">
            <div className="filter-items filter-items-count">
              {listCategory?.length > 0 &&
                listCategory?.map((item, index) => {
                  return (
                    <div className="filter-item" key={item?.id || index}>
                      <CheckedItem
                        label={item?.name || ""}
                        id={item?.id || index}
                        //onClick={(value) =>
                        //  //onChangeFilter(item?.id, value.target.checked)
                        //}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="widget widget-collapsible">
        <h3 className="widget-title">
          <a
            data-toggle="collapse"
            href="#widget-2"
            role="button"
            aria-expanded="true"
            aria-controls="widget-5"
          >
            {" "}
            Price{" "}
          </a>
        </h3>
        <div className="collapse show" id="widget-2">
          <div className="widget-body">
            <div className="filter-price">
              <div className="filter-price-text">
                {" "}
                Price Range: <span id="filter-price-range" />
              </div>
              <div id="price-slider" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
