import React from "react";
import { useAuthen } from "../AuthenContext";
import { LOCAL_STOGARE } from "../../constant/localStogare";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "../../constant/path";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { openModal } = useAuthen();
  const token = localStorage.getItem(LOCAL_STOGARE.token);
  if (!token) {
    openModal();
    return <Navigate to={redirectPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
