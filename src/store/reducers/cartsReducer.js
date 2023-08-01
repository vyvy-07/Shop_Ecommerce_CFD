import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import THUNK_STATUS from "../../constant/thunkStatus";
import cardServices from "../../services/cardServices";

const initialState = {
  cardInfo: {},
  updateStatus: THUNK_STATUS.fullfield,
  getStatus: THUNK_STATUS.fullfield,
};

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCouponCard: (state, action) => {
      state.cardInfo = action?.payload || state.cardInfo;
    },
    clearCard: (state) => {
      state.cardInfo = {};
    },
  },
  extraReducers: (builder) => {
    //get carts

    builder.addCase(getCard.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    builder.addCase(getCard.fulfilled, (state, action) => {
      state.getStatus = THUNK_STATUS.fullfield;
      state.cardInfo = action.payload;
    });
    builder.addCase(getCard.rejected, (state) => {
      state.getStatus = THUNK_STATUS.reject;
      state.cardInfo = {};
    });

    // update card

    builder.addCase(updateCard.pending, (state) => {
      state.updateStatus = THUNK_STATUS.pending;
    });
    builder.addCase(updateCard.fulfilled, (state) => {
      state.updateStatus = THUNK_STATUS.fullfield;
    });
    builder.addCase(updateCard.rejected, (state) => {
      state.updateStatus = THUNK_STATUS.reject;
    });
  },
});
export const { clearCard, updateCouponCard } = cartActions;

export const getCard = createAsyncThunk("cart/get", async (_, thunAPI) => {
  try {
    const res = await cardServices.getCard();

    //clone ra 1 bản sao để k ảnh hưởng tới cái data ban đầu nhận được
    const cardInfo = { ...res?.data?.data };
    // tính tổng tiền
    const subTotal = cardInfo?.quantity?.reduce((crr, next, index) => {
      return (
        crr + Number(next) * Number(cardInfo?.product?.[index]?.price || 0)
      );
    }, 0);
    // tính tổng tiền có mã giãm giá
    const total =
      subTotal -
      subTotal * ((cardInfo?.discound || 0) / 100) +
      (cardInfo?.shipping?.price || 0);
    // số lượng sản phẩm
    const totalProduct =
      cardInfo?.quantity?.reduce(
        (crr, number) => Number(crr) + Number(number),
        0
      ) || "0";

    const modCartInfo = {
      ...cardInfo,
      subTotal,
      total,
      totalProduct: [totalProduct.toString()],
    };
    // console.log("modCartInfo", modCartInfo);
    thunAPI.fulfillWithValue(modCartInfo);
    return modCartInfo;
  } catch (error) {
    console.log("error", error);
    thunAPI.rejectWithValue(error);
    throw error;
  }
});
export const updateCard = createAsyncThunk(
  "cart/update",
  async (actionPayload, thunkApi) => {
    try {
      const res = await cardServices.updateCard({
        ...actionPayload,
        subTotal: 0,
        total: 0,
        totalProduct: ["string"],
        discount: 0,
        paymentMethod: "string",
      });
      const cardInfo = res?.data?.data;
      thunkApi.dispatch(getCard());
      thunkApi.fulfillWithValue(cardInfo);
      return cardInfo;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);
export default cartReducer;
