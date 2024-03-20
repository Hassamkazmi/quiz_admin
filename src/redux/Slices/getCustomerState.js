import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getCustomerStateSlice = createSlice({
  name: "getCustomerState",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetCustomerState.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetCustomerState.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetCustomerState.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getCustomerStateSlice.reducer;




export const fetchgetCustomerState = createAsyncThunk(
  "/getCustomerStateget/fetch",
  async ({id}) => {

    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/state?country_id=${id}&size=300`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);




