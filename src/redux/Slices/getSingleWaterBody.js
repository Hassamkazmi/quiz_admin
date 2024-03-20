import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const singlewaterbodySlice = createSlice({
  name: "singlewaterbody",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchsinglewaterbody.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchsinglewaterbody.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchsinglewaterbody.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default singlewaterbodySlice.reducer;




export const fetchsinglewaterbody = createAsyncThunk(
  "/singlewaterbodyget/fetch",
  async ({id}) => {

    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};


    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/waterbody/${id}`,
      config
    );
    const CustomersData = res.data.data;
    return CustomersData;
  }
);




