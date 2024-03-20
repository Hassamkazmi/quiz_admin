import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const itemNeededWaterBodySlice = createSlice({
  name: "getWaterBodyItemNeeded",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchitemNeededWaterBody.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchitemNeededWaterBody.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchitemNeededWaterBody.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default itemNeededWaterBodySlice.reducer;

export const fetchitemNeededWaterBody = createAsyncThunk(
  "/itemNeededWaterBodyget/fetch",
  async ({waterbody_id}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/item?waterbody_id=${waterbody_id}`,
      config
    );
    const CustomersData = res.data?.result?.items;
    return CustomersData;
  }
);
