import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// --------------- post Customer Data Reducer----------------- //

export const postRegistrationData = createAsyncThunk(
  "postRegistration/postData",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/SuperAdmin`,
        data,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const postRegistrationSlice = createSlice({
  name: "postRegistration",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRegistrationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRegistrationData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postRegistrationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postRegistrationSlice.actions; // Export the clearData action

export default postRegistrationSlice.reducer;
