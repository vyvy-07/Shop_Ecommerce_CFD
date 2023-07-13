import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { ENV } from "../constant/enviroment";
import { authReducer } from "./reducers/authReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});

export default store;
