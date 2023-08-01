import { createSlice } from "@reduxjs/toolkit";
import { getCard } from "./cartsReducer";

const initialState = {
  orderInfo: {},
  updateStatus: "",
};

export const { reducer: orderReducer, action: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers,
  extraReducers:(builder)=>{
    builder.addCase(getOrder.pending ,(state)=>{
        state.getStatus= 
    })
  }
});
