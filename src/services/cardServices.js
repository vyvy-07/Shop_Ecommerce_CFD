import axiosInstance from "../utils/axiosInstance";

const cardServices = {
  getCard() {
    return axiosInstance.get(`/carts/me`);
  },
  updateCard(payload) {
       return axiosInstance.put(`/carts`, payload);
  },
};

export default cardServices;
