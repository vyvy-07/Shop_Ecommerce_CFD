import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { ENV } from "../constant/enviroment";
import { authReducer } from "./reducers/authReducer";
import cartReducer from "./reducers/cartsReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});

export default store;
