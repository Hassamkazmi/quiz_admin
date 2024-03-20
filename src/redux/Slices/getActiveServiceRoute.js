import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const activeServicedashboardSlice = createSlice({
  name: "activeServicedashboard",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchactiveServicedashboard.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchactiveServicedashboard.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchactiveServicedashboard.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default activeServicedashboardSlice.reducer;



export const fetchactiveServicedashboard = createAsyncThunk(
  "/activeServicedashboardget/fetch",
  async ({date , technician_id}) => {
    const params = {}
    if (date != "") params.date = date;
    if (technician_id != "") params.technician_id = technician_id;
   
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };

    config.params = params;
    
  

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment/RouteBuilder`,
      config
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);




