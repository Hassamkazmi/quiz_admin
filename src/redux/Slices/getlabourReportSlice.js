import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const labourReportSlice = createSlice({
  name: "labourReport",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchlabourReport.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchlabourReport.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchlabourReport.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchlabourReportByID.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchlabourReportByID.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchlabourReportByID.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default labourReportSlice.reducer;





export const fetchlabourReport = createAsyncThunk(
  "/labourReportget/fetch",
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

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/LaborReport`, {
      params: queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);


export const fetchlabourReportByID = createAsyncThunk(
  "/workorderReportgetbyid/fetch",
   async ({id ,StartDate , EndDate, currentPage}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(currentPage && { page: currentPage }),
    };


    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/WorkOrderDetailTechWise/${id}/${StartDate}/${EndDate}`, {
      params: queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);

