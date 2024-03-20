import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getWorkOrderSlice = createSlice({
  name: "getWorkOrder",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetWorkOrder.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetWorkOrder.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetWorkOrder.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  
  }
});

export default getWorkOrderSlice.reducer;





export const fetchgetWorkOrder = createAsyncThunk(
  "/getWorkOrderget/fetch",
  async () => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/workOrder`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);


export const fetchgetWorkOrderByType = createAsyncThunk(
  "/getWorkOrderget/fetch",
  async ({work_order_type_id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/workOrder?work_order_type_id=${work_order_type_id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);


export const fetchgetWorkOrderByWaterBody = createAsyncThunk(
  "/getWorkOrderget/fetch",
  async ({waterbody_id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/workOrder?waterbody_id=${waterbody_id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);



