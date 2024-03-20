import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const skippedStopReportSlice = createSlice({
  name: "skippedStopReport",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchskippedStopReport.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchskippedStopReport.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchskippedStopReport.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchskippedStopReportByID.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchskippedStopReportByID.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchskippedStopReportByID.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default skippedStopReportSlice.reducer;





export const fetchskippedStopReport = createAsyncThunk(
  "/skippedStopReportget/fetch",
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

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/SkipStop`, {
      params: queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);



export const fetchskippedStopReportByID = createAsyncThunk(
  "/skippedStopReportgetbyid/fetch",
   async ({StartDate , EndDate , id , currentPage}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/SkipRouteDetailTechWise/${id}/${StartDate}/${EndDate}`, {
      params: queryParams,
      headers: config,
    });
    const LabourData = res.data.result;
    return LabourData;
  }
);
