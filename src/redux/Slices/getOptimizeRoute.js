import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getOptimizeRouteSlice = createSlice({
  name: "OptimizeRoute",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetOptimizeRoute.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetOptimizeRoute.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetOptimizeRoute.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getOptimizeRouteSlice.reducer;




export const fetchgetOptimizeRoute = createAsyncThunk(
  "/getOptimizeRouteget/fetch",
  async ({date}) => {

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment/OptimizeRoute/${date}`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);




