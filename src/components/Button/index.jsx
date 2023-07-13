import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const ButtonItem = ({
  variant = "pramary",
  link,
  className,
  disabled,
  children,
  ...rest
}) => {
  const variantClassName = useMemo(() => {
    switch (variant) {
      case "primary":
        return "btn btn-primary";
      case "outline":
        return "btn btn-outline-primary-2";
      default:
        return "";
    }
  }, [variant]);
  if (!link) {
    return (
      <button className={`${className ?? ""} ${variantClassName}`} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Link
      to={link}
      className={`${className ?? ""} ${variantClassName}`}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ButtonItem;
