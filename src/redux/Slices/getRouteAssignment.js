import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getRouteAssingnmentSlice = createSlice({
  name: "getRouteAssingnment",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetRouteAssingnment.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetRouteAssingnment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetRouteAssingnment.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getRouteAssingnmentSlice.reducer;




export const fetchgetRouteAssingnment = createAsyncThunk(
  "/getRouteAssingnmentget/fetch",
  async ({waterbody_id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment?waterbody_id=${waterbody_id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);




