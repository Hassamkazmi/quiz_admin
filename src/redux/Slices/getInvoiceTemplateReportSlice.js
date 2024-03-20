import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const InvoiceTemplateSlice = createSlice({
  name: "InvoiceTemplate",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoiceTemplate.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchInvoiceTemplate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchInvoiceTemplate.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
  }
});

export default InvoiceTemplateSlice.reducer;





export const fetchInvoiceTemplate = createAsyncThunk(
  "/InvoiceTemplateget/fetch",
   async ({ID,SID, StartDate, EndDate}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(ID && { ID }),
      ...(SID && { SID }),
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/InvoicingPaymentHistory/InvoicingTemplate/${ID}/${SID}/${StartDate}/${EndDate}`, {
      // params: queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);
