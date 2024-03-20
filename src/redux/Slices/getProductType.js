import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getProductTypeSlice = createSlice({
  name: "getProductType",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetProductType.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetProductType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetProductType.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getProductTypeSlice.reducer;

export const fetchgetProductType = createAsyncThunk(
  "/getProductTypeget/fetch",

  async ({ name, page }) => {
    const token = Cookies.get("userToken");

    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(name && { name }),

      ...(page && { page }),
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/ItemType`, {
      params: queryParams,
      headers: config,
    });
    const CustomersData = res.data.result;
    return CustomersData;
  }
);
