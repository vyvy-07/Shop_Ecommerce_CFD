import React, { useState } from "react";
import { styled } from "styled-components";
const InputStyled = styled.input`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    padding: 0;
    text-align: center;
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
const QuantityInput = ({
  className,
  value,
  min = 1,
  max = 10,
  step = 1,
  onChange,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState(value || "1");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onBlurInput = (e) => {
    const value = modifyValue(e.target.value);
    onChange(value);
  };
  const modifyValue = (value) => {
    if (value < min) {
      setInputValue(min);
    } else if (value > max) {
      setInputValue(max);
    } else {
      return value;
    }
  };
  const handleIncrement = () => {
    const value = modifyValue(Number(inputValue) + step);
    setInputValue(value);
    onChange(value);
  };
  const handleDecrement = () => {
    const value = modifyValue(Number(inputValue) - step);
    setInputValue(value);
    onChange(value);
  };

  return (
    <div className={className}>
      <div className="input-group  input-spinner">
        <div className="input-group-prepend">
          <button
            style={{ minWidth: "26px" }}
            className="btn btn-decrement btn-spinner"
            type="button"
            onClick={handleDecrement}
          >
            <i className="icon-minus" />
          </button>
        </div>
        <InputStyled
          type="number"
          className="form-control"
          value={inputValue}
          required
          onChange={handleInputChange}
          onBlur={onBlurInput}
          {...inputProps}
        />
        <div className="input-group-append">
          <button
            style={{ minWidth: "26px" }}
            className="btn btn-increment btn-spinner"
            type="button"
            onClick={handleIncrement}
          >
            <i className="icon-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityInput;
