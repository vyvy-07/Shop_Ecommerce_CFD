import React from "react";
import axiosInstance from "../utils/axiosInstance";

export const addressServices = {
  getProvince(query = "") {
    return axiosInstance.get(`https://vapi.vnappmob.com/api/province/${query}`);
  },
  getDistrict(query = "") {
    return axiosInstance.get(
      `https://vapi.vnappmob.com/api/province/district/${query}`
    );
  },
};
