import React from "react";
import axiosInstance from "../utils/axiosInstance";

export const addressServices = {
  getProvince(query = "") {
    return axiosInstance.get(`/provinces/${query}`);
  },
  getDistrict(query = "") {
    return axiosInstance.get(`/districts/${query}`);
  },
  getWard(query = "") {
    return axiosInstance.get(`/wards/${query}`);
  },
};
