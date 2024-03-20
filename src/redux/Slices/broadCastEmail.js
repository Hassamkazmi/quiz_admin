import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const broadCastEmailSlice = createSlice({
  name: "broadCastEmail",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAllbroadCastEmail.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllbroadCastEmail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllbroadCastEmail.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default broadCastEmailSlice.reducer;

export const fetchgetAllbroadCastEmail = createAsyncThunk(
  "/broadCastEmail/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    // const queryParams = {
    //   ...(name && { name }),

    //   ...(page && { page }),
    // };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/emails/BroadCastEmailCustomers`,
      {
        headers: config,
      }
    );
    const emailData = res.data.result;
    return emailData;
  }
);
