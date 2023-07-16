import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  authActions,
  getProfile,
  login,
} from "../../store/reducers/authReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { message } from "antd";
import { AuthService } from "../../services/authServices";
import { LOCAL_STOGARE } from "../../constant/localStogare";
import { getCard } from "../../store/reducers/cartsReducer";
const AuthenContext = createContext({});

export const AuthenProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isOpenAuthenModal, setIsOpenAuthenModal] = useState(false);
  const [tab, setTab] = useState("login");

  const openModal = () => {
    document.body.classList.add("modal-open");
    return setIsOpenAuthenModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    return setIsOpenAuthenModal(false);
  };
  const token = localStorage.getItem(LOCAL_STOGARE.token);

  const onLogin = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          email: data?.email,
          password: data?.password,
        };
        const res = await dispatch(login(payload));
        const profileData = unwrapResult(res);
        if (profileData?.id) {
          closeModal();
          message.success(
            `Wellcome ${profileData?.firstName || profileData?.lastName}!!`
          );
        }
      } catch (error) {
        console.log("error :>> ", error);
        message.error("Something wrong. Please try again!");
      }
    }
  };
  const onRegister = async (data) => {
    if (data?.email) {
      try {
        const payload = {
          firstName: "",
          lastName: "",
          email: data?.email,
          password: data.password,
        };
        const res = await AuthService.register(payload);
        console.log("res :>> ", res);
        if (res?.data?.data?.id) {
          onLogin({ email: data?.email, password: data.password });
        }
      } catch (error) {
        console.log("error :>> ", error);
        message.error("Something wrong. Please try again!");
      }
    }
  };
  const onGetProfile = () => {
    const token = localStorage.getItem(LOCAL_STOGARE.token);
    if (token) {
      dispatch(getProfile());
    }
  };
  useEffect(() => {
    if (token) {
      console.log("ok");
      onGetProfile();
      dispatch(getCard());
    }
  }, []);

  return (
    <AuthenContext.Provider
      value={{
        isOpenAuthenModal,
        tab,
        closeModal,
        setTab,
        openModal,
        onLogin,
        onRegister,
        onGetProfile,
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};
export const useAuthen = () => useContext(AuthenContext);
