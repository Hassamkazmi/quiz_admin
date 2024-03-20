import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGetSalesTax = createSlice({
  name: "SalesTax",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesTax.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSalesTax.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchSalesTax.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getGetSalesTax.reducer;

export const fetchSalesTax = createAsyncThunk(
  "/SalesTaxget/fetch",
  async ({ currentPage, size }, thunkAPI) => {
    const state = thunkAPI.getState().SalesTax;

    // Check if data has already been fetched

    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(currentPage && { page: currentPage }),
    };
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/salesTax`, {
        params: queryParams,
        headers: config,
      });
      const SalesTaxData = res.data.result;
      return SalesTaxData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching SalesTaxs:", error);
      throw error;
    }
  }
);

export const fetchSalesAllTax = createAsyncThunk(
  "/SalesTaxget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().SalesTax;

    // Check if data has already been fetched

    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/salesTax?size=5555`,
        {
          headers: config,
        }
      );
      const SalesTaxData = res.data.result;
      return SalesTaxData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching SalesTaxs:", error);
      throw error;
    }
  }
);