import React from "react";
import Select from "../../components/Select";
import { SORT_OBJECT } from "../../constant/sort";

const Toolbox = ({ showNumber, showPage, activeSort, onSortChange }) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
    console.log("object :>> ", e.target.value);
  };

  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          {" "}
          Showing{" "}
          <span>
            {showNumber} of {showPage}
          </span>{" "}
          Products{" "}
        </div>
      </div>
      <div className="toolbox-right">
        <div className="toolbox-sort">
          <Select
            defaultValue={SORT_OBJECT.popularity.value}
            label="Sort by: "
            className="toolbox-sort"
            onChange={onSelectChange}
            options={[
              SORT_OBJECT.popularity,
              SORT_OBJECT.newest,
              SORT_OBJECT.rating,
              SORT_OBJECT.pricehight,
              SORT_OBJECT.pricelow,
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
