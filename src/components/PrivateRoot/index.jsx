import React from "react";
import { LOCAL_STOGARE } from "../../constant/localStogare";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoot = ({ redictpath = "/" }) => {
  const islogin = localStorage.getItem(LOCAL_STOGARE.token);
  if (!islogin) {
    <Navigate to={redictpath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoot;
