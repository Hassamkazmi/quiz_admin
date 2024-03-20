import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getWorkOrderRouteApiSlice = createSlice({
  name: "WorkOrderRouteApi",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetWorkOrderRouteApi.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetWorkOrderRouteApi.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetWorkOrderRouteApi.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getWorkOrderRouteApiSlice.reducer;




export const fetchgetWorkOrderRouteApi = createAsyncThunk(
  "/getWorkOrderRouteApiget/fetch",
  async ({start_date , end_date , TechId , assigned_day}) => {

    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    
    const queryParams = {
      ...(start_date && { start_date }),
      ...(end_date && { end_date }),
      ...(TechId && { TechId }),
      ...(assigned_day && { assigned_day }),
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/RouteAssignment/WorkOrderRoutes`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const CustomersData = res.data;
    return CustomersData;
  }
);




