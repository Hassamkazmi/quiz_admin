import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getProfitDataSlice = createSlice({
  name: "getProfitData",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetProfitData.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetProfitData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetProfitData.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      
  }
});

export default getProfitDataSlice.reducer;



export const fetchgetProfitData = createAsyncThunk(
  "/getProfitDataget/fetch",
  async ({StartDate , EndDate , currentPage}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };    
    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/ProfitListing`,{
        params: queryParams,
        headers: config,
      }
      
    );
    const InvoiceData = res.data?.result;
    return InvoiceData;
  }
);





