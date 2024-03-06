import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCard } from "./cartsReducer";
import THUNK_STATUS from "../../constant/thunkStatus";
import { orderServices } from "../../services/orderServices";

const initialState = {
  listOrder: {},
  checkoutStatus: THUNK_STATUS.fullfield,
};

export const { reducer: orderReducer, action: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.listOrder = action.payload;
    });
  },
});

export const getOrder = createAsyncThunk("order/get", async (_, thunkApi) => {
  try {
    const res = await orderServices.getOrders();
    const listOrder = res?.data?.data;
    thunkApi.fulfillWithValue(listOrder);
    return listOrder;
  } catch (error) {
    console.log("error", error);
    thunkApi.rejectWithValue(error);
    throw error;
  }
});

export const checkout = createAsyncThunk(
  "checkout/post",
  async (payload, thunkApi) => {
    try {
      if (payload) {
        const res = await orderServices.postOrder(payload);
        const orderInfo = res?.data?.data;
        thunkApi.dispatch(getOrder());
        thunkApi.dispatch(getCard());
        thunkApi.fulfillWithValue(orderInfo);
        return orderInfo;
      }
    } catch (error) {
      console.log("error", error);
      thunkApi.rejectWithValue(error);
      throw error;
    }
  }
);
