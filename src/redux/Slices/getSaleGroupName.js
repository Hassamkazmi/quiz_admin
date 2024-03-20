import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGetSalesTaxGroupName = createSlice({
  name: "SalesTaxGroupName",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesTaxGroupName.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSalesTaxGroupName.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchSalesTaxGroupName.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getGetSalesTaxGroupName.reducer;

export const fetchSalesTaxGroupName = createAsyncThunk(
  "/SalesTaxGroupNameget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().SalesTaxGroupName;

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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/SalesTaxGroupName`, config);
      const SalesTaxGroupNameData = res.data.result.items;
      return SalesTaxGroupNameData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching SalesTaxGroupNames:", error);
      throw error;
    }
  }
);
