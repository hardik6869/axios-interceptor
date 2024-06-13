import {
  FETCH_PROTECTED_DATA_FAILURE,
  FETCH_PROTECTED_DATA_SUCCESS,
  GET_USERS,
} from "../actions/types";

const initialState = {
  data: null,
  error: null,
  users: null,
};

const protectedDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROTECTED_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_PROTECTED_DATA_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default protectedDataReducer;
