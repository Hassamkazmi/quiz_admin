import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getInvoiceDetailSlice = createSlice({
  name: "getInvoiceDetail",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetInvoiceSingle.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetInvoiceSingle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetInvoiceSingle.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      
  }
});

export default getInvoiceDetailSlice.reducer;


export const fetchgetInvoiceSingle = createAsyncThunk(
  "/getInvoiceSingleget/fetch",
  async ({Id ,locationId,StartDate , EndDate}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };    
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/CustomerInvoiceDateWise/${Id}/${locationId}/${StartDate}/${EndDate}`,
      config
    );
    const InvoiceData = res.data?.data;
    return InvoiceData;
  }
);




