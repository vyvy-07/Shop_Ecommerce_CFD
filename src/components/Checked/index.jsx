import React from "react";

const CheckedItem = ({ label, children, required, onClick, ...propsCheck }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id="signin-remember"
        onClick={onClick}
      />
      <label className="custom-control-label" htmlFor="signin-remember">
        {label}
        {children || ""} 
      </label>
    </div>
  );
};

export default CheckedItem;
