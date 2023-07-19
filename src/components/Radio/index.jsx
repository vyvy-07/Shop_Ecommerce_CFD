import { createContext, useContext, useEffect, useState } from "react";

export const RadioContext = createContext();

const RadioGroup = ({
  defaultValue,
  className,
  disabled,
  onChange,
  children,
}) => {
  //1 state để lưu gtri của value lại khi mỗi lần nó thay đổi
  const [value, setValue] = useState(defaultValue || "");
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  const checkValue = (e) => {
    const value = e.target.value;
    setValue(value);
    // nếu có thằng nào thay đổi thì sẽ báo với onChange để thay đổi
    onChange?.(value);
  };
  return (
    <RadioContext.Provider
      value={{ value, checkValue, disabled }}
      className={`summary-shipping-row ${className}`}
    >
      {children}
    </RadioContext.Provider>
  );
};
const RadioItem = ({ children, disabled = false, value }) => {
  const { value: selectedValue, checkValue } = useContext(RadioContext);
  return (
    <div className="custom-control custom-radio">
      <input
        type="radio"
        className="custom-control-input"
        id={value}
        name={value}
        value={value}
        disabled={disabled}
        onChange={checkValue}
        checked={selectedValue === value}
      />
      <label className="custom-control-label" htmlFor={value}>
        {children}
      </label>
    </div>
  );
};
export default { Group: RadioGroup, Item: RadioItem };
