import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getCustomerCountrySlice = createSlice({
  name: "getCustomerCountry",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetCustomerCountry.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetCustomerCountry.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchgetCustomerCountry.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getCustomerCountrySlice.reducer;

export const fetchgetCustomerCountry = createAsyncThunk(
  "/getCustomerCountryget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().getCustomerCountry;

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
        `${process.env.REACT_APP_API_URL}/country?size=300`,
        config
      );
      const CustomersData = res.data.result;
      return CustomersData.items;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching customer countries:", error);
      throw error;
    }
  }
);
