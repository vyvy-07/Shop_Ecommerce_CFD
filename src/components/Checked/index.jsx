import React from "react";

const CheckedItem = ({
  label,
  children,
  id,
  required,
  onClick,
  ...propsCheck
}) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id||"signin-remember"}
        onClick={onClick}
        {...propsCheck}
      />
      <label className="custom-control-label" htmlFor={id||"signin-remember"}>
        {label}
        {children || ""}
      </label>
    </div>
  );
};

export default CheckedItem;
