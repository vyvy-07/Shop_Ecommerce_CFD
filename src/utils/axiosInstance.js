import axios from 'axios';
import { message } from 'antd';
import { BASE_URL } from '../constant/enviroment';
import { LOCAL_STOGARE } from '../constant/localStogare';

//tạo 1 instance của axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
//can thiệp vào qtrinh phản hồi: interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 || error.response.status === 403) {
      try {
        const res = await axiosInstance.put(`/customer/refresh`, {
          refreshToken: localStorage.getItem(LOCAL_STOGARE.refreshToken),
        });
        const data = res?.data?.data;
        //lưu token mới lại
        localStorage.setItem(LOCAL_STOGARE.token, data.token);
        localStorage.setItem(LOCAL_STOGARE.refreshToken, data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        //gọi lại yêu cầu với token mới
        return axiosInstance(originalRequest);
      } catch (error) {
        console.log('error', error);
      }
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      LOCAL_STOGARE.token
    )}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
