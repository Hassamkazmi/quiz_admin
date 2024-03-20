import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getRateTypeSlice = createSlice({
  name: "getRateType",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetRateType.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetRateType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchgetRateType.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getRateTypeSlice.reducer;

export const fetchgetRateType = createAsyncThunk(
  "/getRateTypeget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().getRateType;

    // Check if data has already been fetched
    if (state.fetched) {
      return state.data;
    }

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/rateType`, config);
      const rateTypeData = res.data.result.items;
      return rateTypeData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching rate type data:", error);
      throw error;
    }
  }
);
