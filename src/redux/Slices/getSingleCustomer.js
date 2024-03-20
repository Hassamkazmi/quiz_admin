import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getSingleCustomersSlice = createSlice({
  name: "getSingleCustomer",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetSingleCustomers.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetSingleCustomers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetSingleCustomers.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  }
});

export default getSingleCustomersSlice.reducer;




export const fetchgetSingleCustomers = createAsyncThunk(
  "/getSingleCustomersget/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/options/${id}`,
      config
    );
    const CustomersData = res.data.data;
    return CustomersData;
  }
);




