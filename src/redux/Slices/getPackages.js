import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const packagesDataSlice = createSlice({
  name: "packagesData",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchpackagesData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchpackagesData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchpackagesData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default packagesDataSlice.reducer;




export const fetchpackagesData = createAsyncThunk(
  "/packagesDataget/fetch",
  async () => {

    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/package/GetPackageListing`,
      config
    );
    const CustomersData = res.data?.result.items[0];
    return CustomersData;
  }
);




