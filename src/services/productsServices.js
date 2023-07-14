import axiosInstance from "../utils/axiosInstance";

export const productsServices = {
  getListProduct(query = "") {
    return axiosInstance.get(`/products${query}`);
  },
  getProductInfo(slug) {
    return axiosInstance.get(`/products/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/product-categories${query}`);
  },
};
