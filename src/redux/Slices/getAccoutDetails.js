import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const accountDetailSlice = createSlice({
  name: "accountDetail",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchaccountDetail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchaccountDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchaccountDetail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default accountDetailSlice.reducer;





export const fetchaccountDetail = createAsyncThunk(
  "/accountDetailget/fetch",
   async () => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/owner/Auth/me`, {
      headers: config,
    });
    const CustomersData = res.data;
    return CustomersData;
  }
);
