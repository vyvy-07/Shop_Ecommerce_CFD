import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import THUNK_STATUS from "../../constant/thunkStatus";
import cardServices from "../../services/cardServices";

const initialState = {
  cardInfo: {},
  updateStatus: THUNK_STATUS.fullfield,
  getStatus: THUNK_STATUS.fullfield,
};

export const { reducer: cartsReducer, action: cartsAction } = createSlice({
  initialState,
  name: "cart",
  reducer: {
    clearCard: (state) => {
      state.cardInfo = {};
    },
  },
  extraReducers: (builder) => {
    //get carts

    builder.addCase(addCase.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    builder.addCase(addCase.fullfield, (state) => {
      state.getStatus = THUNK_STATUS.fullfield;
      state.cardInfo = action.payload;
    });
    builder.addCase(addCase.rejected, (state) => {
      state.getStatus = THUNK_STATUS.reject;
    });

    // update card
    builder.addCase(addCase.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    builder.addCase(addCase.fullfield, (state) => {
      state.getStatus = THUNK_STATUS.fullfield;
      state.cardInfo = action.payload;
    });
    builder.addCase(addCase.rejected, (state) => {
      state.getStatus = THUNK_STATUS.reject;
    });
  },
});
// export const { clearCard } = cartsAction;
export const getCard = createAsyncThunk("cart/get", async (_, thunAPI) => {
  try {
    const res = await cardServices.getCard();

    //clone ra 1 bản sao để k ảnh hưởng tới cái data ban đầu nhận được
    const dataCard = { ...res?.data?.data };
    // tính tổng tiền
    const subTotal = dataCard?.quantity?.reduce((crr, next, index) => {
      return (
        crr + Number(next) * Number(dataCard?.product?.[index]?.price || 0)
      );
    }, 0);
    // tính tổng tiền có mã giãm giá
    const total = subTotal - subTotal * ((dataCard?.discound || 0) / 100);
    // số lượng sản phẩm
    const totalProduct =
      dataCard?.quantity?.reduce(
        (crr, number) => Number(crr) + Number(number),
        0
      ) || "0";

    const modCartInfo = {
      ...dataCard,
      subTotal,
      total,
      totalProduct: [totalProduct.toString()],
    };
    console.log("modCartInfo", modCartInfo);
    thunAPI.fulfillWithValue(modCartInfo);
    return modCartInfo;
  } catch (error) {
    console.log("error", error);
    thunAPI.rejectWithValue(error);
    throw error;
  }
});

export default cartsReducer;
