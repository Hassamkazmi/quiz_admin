import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// --------------- post Customer Data Reducer----------------- //

export const postChangePayment = createAsyncThunk(
  "postChangePayment/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      console.log(Data,"DataDataDataDataDataDataDataDataData")
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/SuperAdmin/customer/updateCard`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const postChangePaymentSlice = createSlice({
  name: "postChangePayment",
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
      .addCase(postChangePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postChangePayment.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postChangePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postChangePaymentSlice.actions; // Export the clearData action

export default postChangePaymentSlice.reducer;
