import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk for posting customer data
export const postResetpasswordData = createAsyncThunk(
  "postResetpassword/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/change/password`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postResetpasswordSlice = createSlice({
  name: "postResetpassword",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postResetpasswordData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postResetpasswordData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Password Changed Successfully";
      })
      .addCase(postResetpasswordData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { clearData } = postResetpasswordSlice.actions;

export default postResetpasswordSlice.reducer;
