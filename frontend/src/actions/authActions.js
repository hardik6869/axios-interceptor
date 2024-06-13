import { toast } from "react-toastify";
import {
  setupLoginUser,
  setupSinupUser,
  setupUserLogout,
} from "../utils/apiPaths";
import api from "../utils/axiosinterceptor";
import { SET_USER } from "./types";
import Cookies from "js-cookie";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const login = (username, password, navigate) => async (dispatch) => {
  try {
    const response = await api.post(setupLoginUser, { username, password });
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
    dispatch(setUser({ username }));
    toast.success("Login successful");
    navigate("/home");
  } catch (error) {
    toast.error("Login failed", error);
  }
};

export const register = (username, password, navigate) => async (dispatch) => {
  try {
    await api.post(setupSinupUser, { username, password });
    dispatch(login(username, password, navigate));
  } catch (error) {
    toast.error("Registration failed", error);
  }
};

export const logout = (navigate) => async (dispatch, getState) => {
  try {
    const { protectedData } = getState();
    await api.post(setupUserLogout, { userId: protectedData.data.id });
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(setUser(null));
    navigate("/");
    toast.info("Logged out");
  } catch (error) {
    toast.error("Logout error:", error);
  }
};
