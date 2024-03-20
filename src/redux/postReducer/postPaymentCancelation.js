import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting itemType data
export const postCancelPayment = createAsyncThunk(
  "postCancelPayment/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/SuperAdmin/customer/cancelSubscription`,
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
const postCancelPaymentSlice = createSlice({
  name: "postCancelPayment",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.error = null;
      state.success= null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCancelPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postCancelPayment.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postCancelPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
  },
});
export const { clearData } = postCancelPaymentSlice.actions;
export default postCancelPaymentSlice.reducer;
