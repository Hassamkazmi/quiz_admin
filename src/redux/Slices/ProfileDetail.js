import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const profileDetailSlice = createSlice({
  name: "profileDetail",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchprofileDetail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchprofileDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchprofileDetail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
  }
});

export default profileDetailSlice.reducer;





export const fetchprofileDetail = createAsyncThunk(
  "/profileDetailget/fetch",
   async () => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/owner/Auth/me`, {
      headers: config,
    });
    const CustomersData = res.data;
    return CustomersData;
  }
);
