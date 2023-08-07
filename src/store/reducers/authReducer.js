import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOCAL_STOGARE } from "../../constant/localStogare";
import { AuthService } from "../../services/authServices";
import { getCard } from "./cartsReducer";

const initialState = {
  profile: null,
  listOrder: null,
};
export const { reducer: authReducer, actions: authActions } = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state) => {
      localStorage.removeItem(LOCAL_STOGARE.token);
      localStorage.removeItem(LOCAL_STOGARE.refreshToken);
      state.profile = null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setOrder: (state, action) => {
      state.listOrder = action.payload;
    },
  },
});
export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const loginRes = await AuthService.login(payload);
      //ok
      const { token, refreshToken } = loginRes?.data?.data || {};
      localStorage.setItem(LOCAL_STOGARE.token, token);
      localStorage.setItem(LOCAL_STOGARE.refreshToken, refreshToken);

      const profileRes = await AuthService.getProfile();

      thunkAPI.dispatch(authActions?.setProfile(profileRes?.data?.data));
      thunkAPI.dispatch(getCard());
      return profileRes?.data?.data;
    } catch (error) {
      console.log("error :>> ", error);
      throw error;
    }
  }
);
export const { logout, setOrder } = authActions;
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (payload, thunkAPI) => {
    try {
      console.log("payload :>> ", payload);
      const data = await AuthService.getProfile();
      thunkAPI.dispatch(authActions?.setProfile(data?.data?.data));
      return data?.data?.data;
    } catch (error) {
      console.log("error :>> ", error);
      throw error;
    }
  }
);
