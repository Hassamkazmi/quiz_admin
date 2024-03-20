import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getCustomerTypeSlice = createSlice({
  name: "getCustomerType",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetCustomerType.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetCustomerType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchgetCustomerType.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getCustomerTypeSlice.reducer;

export const fetchgetCustomerType = createAsyncThunk(
  "/getCustomerTypeget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().getCustomerType;

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
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/customerType`,
        config
      );
      const CustomersData = res.data.result;
      return CustomersData.items;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching customer types:", error);
      throw error;
    }
  }
);
