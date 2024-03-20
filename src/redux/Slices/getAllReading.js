import axios from "axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getAllreadingSlice = createSlice({
  name: "getAllreading",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAllreading.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllreading.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllreading.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetAllreadingTaken.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllreadingTaken.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllreadingTaken.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getAllreadingSlice.reducer;

export const fetchgetAllreading = createAsyncThunk(
  "/getAllreadingget/fetch",
  async ({ name, page }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(name && { name }),

      ...(page && { page }),
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/reading`, {
      params: queryParams,
      headers: config,
    });
    const CustomersData = res.data.result;
    return CustomersData;
  }
);


export const fetchgetAllreadingTaken = createAsyncThunk(
  "/getAllreadinggettaken/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/readingTaken?active_service_id=${id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);


