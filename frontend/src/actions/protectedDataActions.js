import { setupUsers } from "../utils/apiPaths";
import api from "../utils/axiosinterceptor";
import {
  FETCH_PROTECTED_DATA_SUCCESS,
  FETCH_PROTECTED_DATA_FAILURE,
} from "./types";

export const fetchProtectedData = () => async (dispatch) => {
  try {
    const response = await api.get(setupUsers);
    dispatch({
      type: FETCH_PROTECTED_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROTECTED_DATA_FAILURE,
      payload: "Failed to fetch protected data",
    });
  }
};
