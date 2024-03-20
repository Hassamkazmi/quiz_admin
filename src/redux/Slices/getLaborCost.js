import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getLaborCostSlice = createSlice({
  name: "getLaborCost",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetLaborCost.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetLaborCost.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetLaborCost.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getLaborCostSlice.reducer;



export const fetchgetLaborCost = createAsyncThunk(
  "/getLaborCostget/fetch",
  async () => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/laborCostType`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);




