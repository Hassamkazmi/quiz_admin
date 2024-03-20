import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGetSalesTaxGroup = createSlice({
  name: "SalesTaxGroup",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesTaxGroup.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSalesTaxGroup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchSalesTaxGroup.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getGetSalesTaxGroup.reducer;

export const fetchSalesTaxGroup = createAsyncThunk(
  "/SalesTaxGroupget/fetch",
  async ({ currentPage }, thunkAPI) => {
    const state = thunkAPI.getState().SalesTaxGroup;

    // Check if data has already been fetched
    // if (state.fetched) {
    //   return state.data;
    // }

    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(currentPage && { page: currentPage }),
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/SalesTaxGroupName`,
        {
          params: queryParams,
          headers: config,
        }
      );
      const SalesTaxGroupData = res.data.result;
      return SalesTaxGroupData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching SalesTaxGroups:", error);
      throw error;
    }
  }
);
