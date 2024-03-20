import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getwaterbodyTypeSlice = createSlice({
  name: "getwaterbodyType",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetwaterbodyType.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetwaterbodyType.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetwaterbodyType.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getwaterbodyTypeSlice.reducer;



export const fetchgetwaterbodyType = createAsyncThunk(
  "/getwaterbodyTypeget/fetch",
  async () => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/waterbodyType`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);




