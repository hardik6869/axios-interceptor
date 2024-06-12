import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import protectedDataReducer from "../reducers/protectedDataReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    protectedData: protectedDataReducer,
  },
});

export default store;
