import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getGettag = createSlice({
  name: "tag",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    fetched: false // Add a property to track whether data has been fetched
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchtag.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchtag.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
        state.fetched = true; // Set the 'fetched' property to true
      })
      .addCase(fetchtag.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getGettag.reducer;

export const fetchtag = createAsyncThunk(
  "/tagget/fetch",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().tag;

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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tag`, config);
      const tagData = res.data.result.items;
      return tagData;
    } catch (error) {
      // Handle any errors that occurred during the API request
      console.error("Error fetching tags:", error);
      throw error;
    }
  }
);
