import axios from "axios";
import Cookies from "js-cookie";
import { setupRefreshToken } from "./apiPaths";
import store from "../store";
import { logout } from "../actions/authActions";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data.status === 401) {
      store.dispatch(logout());
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 ||
      error.response.status === "401" ||
      (error.message === "Request failed with status code 401" &&
        !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
      try {
        const response = await api.post(setupRefreshToken, {
          token: refreshToken,
        });
        const newToken = response.data.accessToken;
        Cookies.set("accessToken", newToken);
        api.defaults.headers.common.authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return await api(originalRequest);
      } catch (err) {
        console.error("Failed to refresh access token", err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
