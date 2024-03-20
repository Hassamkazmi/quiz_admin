import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const workorderReportSlice = createSlice({
  name: "workorderReport",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchworkorderReport.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchworkorderReport.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchworkorderReport.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default workorderReportSlice.reducer;





export const fetchworkorderReport = createAsyncThunk(
  "/workorderReportget/fetch",
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

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/WorkOrderReport`, {
      params:queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);


export const fetchworkorderReportByID = createAsyncThunk(
  "/workorderReportget/fetch",
   async ({StartDate , EndDate ,id , currentPage}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    
    const queryParams = {
      // ...(StartDate && { StartDate }),
      // ...(EndDate && { EndDate }),
      ...(currentPage && { page: currentPage }),
    };


    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/WorkOrderDetailTechWise/${id}/${StartDate}/${EndDate}`, {
      params:queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);
