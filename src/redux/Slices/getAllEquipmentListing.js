import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getAllEquipmemntListingSlice = createSlice({
  name: "getAllEquipmemntListing",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetEquipmemntListing.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetEquipmemntListing.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetEquipmemntListing.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getAllEquipmemntListingSlice.reducer;

export const fetchgetEquipmemntListing = createAsyncThunk(
  "/getAllEquipmemntListing/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/equipment`, {
      headers: config,
    });
    const EquipmentData = res.data.result;
    return EquipmentData.items;
  }
);
