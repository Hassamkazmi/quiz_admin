import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const workOrderTyperecurrenceSlice = createSlice({
  name: "workOrderTyperecurrence",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchworkOrderTyperecurrence.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchworkOrderTyperecurrence.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchworkOrderTyperecurrence.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default workOrderTyperecurrenceSlice.reducer;

export const fetchworkOrderTyperecurrence = createAsyncThunk(
  "/workOrderTyperecurrenceget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().workOrderTyperecurrence;

    // Check if data has already been fetched
    if (state.fetched) {
      return state.data;
    }

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token
      }
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/recurrence`,
        config
      );
      const workOrderTypeRecurrenceData = res.data.result.items;
      return workOrderTypeRecurrenceData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching work order type recurrence data:", error);
      throw error;
    }
  }
);
