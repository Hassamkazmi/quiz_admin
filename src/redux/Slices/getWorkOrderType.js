import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getWorkOrderTypeSlice = createSlice({
  name: "getWorkOrderType",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetWorkOrderType.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetWorkOrderType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetWorkOrderType.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getWorkOrderTypeSlice.reducer;




export const fetchgetWorkOrderType = createAsyncThunk(
  "/getWorkOrderTypeget/fetch",
  async ({ name, page }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };
    const queryParams = {
      ...(name && { name }),

      ...(page && { page }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/workOrderType`,
      { params: queryParams, headers: config }
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);




