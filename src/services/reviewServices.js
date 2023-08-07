import axiosInstance from "../utils/axiosInstance";

export const ListReview = {
  getReview(id = "") {
    return axiosInstance.get(`/reviews/product/${id}`);
  },
  postReview(payload = {}) {
    return axiosInstance.post(`/reviews`, payload);
  },
};
