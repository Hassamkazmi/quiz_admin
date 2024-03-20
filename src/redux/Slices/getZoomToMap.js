import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const ZoomToMapSlice = createSlice({
  name: "ZoomToMap",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZoomToMap.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchZoomToMap.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchZoomToMap.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default ZoomToMapSlice.reducer;

export const { resetData } = ZoomToMapSlice.actions; // Export the clearData action




export const fetchZoomToMap = createAsyncThunk(
  "/ZoomToMapget/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/RouteAssignment/ZoomToMap/${id}`, {
      headers: config,
    });
    const CustomersData = res.data?.data;
    return CustomersData;
  }
);


