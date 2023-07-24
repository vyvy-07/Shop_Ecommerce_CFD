import React, { forwardRef } from "react";

const Inputs = (
  { label, renderInput = undefined, className, required, error, ...props },
  ref
) => {
  return (
    <>
      <label className={className}>
        {label} {required ? "*" : ""}
      </label>
      {renderInput?.(props) || (
        <input
          //type="text"
          {...props}
          className={`form-control ${error ? "input-error" : ""}`}
          ref={ref}
        />
      )}
      {<p className="form-error">{error ? error : ""}</p>}
    </>
  );
};

export const Input = forwardRef(Inputs);
