import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getDashboardApiSlice = createSlice({
  name: "getDashboardApi",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetDashboardApi.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetDashboardApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetDashboardApi.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getDashboardApiSlice.reducer;

export const fetchgetDashboardApi = createAsyncThunk(
  "/getDashboardApiget/fetch",
  async ({currentPage}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/options?page=${currentPage}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);
