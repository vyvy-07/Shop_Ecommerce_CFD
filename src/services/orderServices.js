import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../constant/enviroment";

export const orderServices = {
  getDiscount(id = "") {
    return axiosInstance.get(`/orders/voucher/${id}`);
  },
  postOrder(payload = {}) {
    return axiosInstance.post(`/orders`, payload);
  },
};
