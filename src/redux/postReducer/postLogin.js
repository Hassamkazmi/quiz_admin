import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login`;

// Define the async thunk for posting customer data

export const LoginAdminData = createAsyncThunk(
  "user/login",
  async ({ values }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(apiUrl, values, config);
      if (data.token) {
        Cookies.set("userToken", data.token);
      } else {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);



// Create the Redux Toolkit slice
const LoginAdminSlice = createSlice({
  name: "LoginAdmin",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginAdminData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginAdminData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.message = "success";
      })
      .addCase(LoginAdminData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Access the error message from the payload
      });
  },
});

export default LoginAdminSlice.reducer;
