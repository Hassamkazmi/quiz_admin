import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getPaymentHistorySlice = createSlice({
  name: "getPaymentHistory",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetPaymentHistory.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetPaymentHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetPaymentHistory.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getPaymentHistorySlice.reducer;

export const fetchgetPaymentHistory = createAsyncThunk(
  "/getPaymentHistoryget/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/SuperAdmin/customer/paymentHistory`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);
