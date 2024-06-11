import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000",
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
    if (response.data.statusCode === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/";
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        try {
          const response = await api.post("/auth/refresh", { refreshToken });
          const newToken = response.data.accessToken;
          Cookies.set("accessToken", newToken);
          api.defaults.headers.common.authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return await api(originalRequest);
        } catch (err) {
          console.error("Failed to refresh access token", err);
        }
      } else {
        Cookies.remove("accessToken");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
