import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getSingleProductSlice = createSlice({
  name: "getSingleProduct",
  initialState: {
    data: {},
    status: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchsingleProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchsingleProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchsingleProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export default getSingleProductSlice.reducer;

export const fetchsingleProduct = createAsyncThunk(
  "/getSingleProduct/fetch",
  async ({ id }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Item/${id}`, 
      config
    );
    const product = res.data.result;
    return product;
  }
);
