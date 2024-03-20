import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const posttagsData = createAsyncThunk(
  "posttags/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tag`,
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
const posttagsSlice = createSlice({
  name: "posttags",
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
      .addCase(posttagsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(posttagsData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(posttagsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      })
  },
});
export const { resetData } = posttagsSlice.actions; // Export the clearData action

export default posttagsSlice.reducer;
