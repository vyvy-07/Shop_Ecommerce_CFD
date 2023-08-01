import React, { forwardRef } from "react";

const Inputs = (
  //renderInput là 1 callback dùng để tùy chỉnh 1 trường nhập liệu
  // thay vì input thì có thể thay đổi thành textarea
  { label, renderInput = undefined, className, required, error, ...props },
  ref
) => {
  return (
    <>
      <label className={className}>
        {label} {required ? "*" : ""}
      </label>
      {renderInput?.({ ...props, ref: ref }) || (
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
// React.forwardRef để lấy tham chiếu (value)cùa thằng cha truyền vào con
export const Input = forwardRef(Inputs);
