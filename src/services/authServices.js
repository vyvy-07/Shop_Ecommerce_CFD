import axiosInstance from "../utils/axiosInstance";

export const AuthService = {
  //post truyền payload vào
  login(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload);
  },
  register(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload);
  },
  getProfile(query = "") {
    return axiosInstance.get(`/customer/profiles${query}`);
  },
  putProfile(payload = {}, token = 0 && "") {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        //Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/form-data`,
      },
    });
  },
};
