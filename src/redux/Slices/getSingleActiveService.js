import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getSingleActiveServiceSlice = createSlice({
  name: "getSingleActiveService",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetSingleActiveService.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetSingleActiveService.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetSingleActiveService.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getSingleActiveServiceSlice.reducer;



export const fetchgetSingleActiveService = createAsyncThunk(
  "/getSingleActiveServiceget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/ActiveService/GetServiceDetail/${id}`,
      config
    );
    const CustomersData = res.data.data;
    return CustomersData;
  }
);




