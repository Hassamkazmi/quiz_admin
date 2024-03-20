import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getProfitDetailSlice = createSlice({
  name: "getProfitDetail",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetProfitDetail.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchgetProfitDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchgetProfitDetail.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      
  }
});

export default getProfitDetailSlice.reducer;



export const fetchgetProfitDetail = createAsyncThunk(
  "/getProfitDetailget/fetch",
  async ({id,StartDate , EndDate}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };    
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Invoicing/ProfitDetail/${id}/${StartDate}/${EndDate}`,
      config
    );
    const InvoiceData = res.data?.data;
    return InvoiceData;
  }
);





