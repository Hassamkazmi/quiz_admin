import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getInvoiceDataSlice = createSlice({
  name: "getInvoiceData",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetInvoiceData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetInvoiceData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetInvoiceData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      
  }
});

export default getInvoiceDataSlice.reducer;



export const fetchgetInvoiceData = createAsyncThunk(
  "/getInvoiceDataget/fetch",
  async ({StartDate , EndDate}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };    
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/InvoicedCustomerListing?StartDate=${StartDate}&&EndDate=${EndDate}`,
      config
    );
    const InvoiceData = res.data?.result;
    return InvoiceData;
  }
);





