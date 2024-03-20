import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getCustomerServicesSlice = createSlice({
  name: "getCustomerService",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetCustomerServices.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetCustomerServices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetCustomerServices.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  }
});

export default getCustomerServicesSlice.reducer;




export const fetchgetCustomerServices = createAsyncThunk(
  "/getCustomerServicesget/fetch",
  async ({ id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/serviceLocation?customer_id=${id}`,
      config
    );
    const CustomersData = res.data.result.items;
    return CustomersData;
  }
);




