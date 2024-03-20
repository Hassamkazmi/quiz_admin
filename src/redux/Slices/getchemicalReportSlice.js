import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const chemicalReportSlice = createSlice({
  name: "chemicalReport",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchchemicalReport.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchchemicalReport.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchchemicalReport.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default chemicalReportSlice.reducer;





export const fetchchemicalReport = createAsyncThunk(
  "/chemicalReportget/fetch",
   async ({StartDate , EndDate ,Customer_type, currentPage}) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(StartDate && { StartDate }),
      ...(EndDate && { EndDate }),
      ...(Customer_type && { Customer_type }),
      ...(currentPage && { page: currentPage }),
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Invoicing/ChemicalDosages`, {
      params: queryParams,
      headers: config,
    });
    const LabourData = res.data?.result;
    return LabourData;
  }
);
