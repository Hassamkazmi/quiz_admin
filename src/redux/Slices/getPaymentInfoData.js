import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getPaymentDataSlice = createSlice({
  name: "getPaymentData",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetPaymentData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetPaymentData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetPaymentData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getPaymentDataSlice.reducer;

export const fetchgetPaymentData = createAsyncThunk(
  "/getPaymentDataget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/SuperAdmin/customer/getCardDetails`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);
