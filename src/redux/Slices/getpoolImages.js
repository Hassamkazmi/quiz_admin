import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const waterbodyImageSlice = createSlice({
  name: "waterbodyImage",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchwaterbodyImage.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchwaterbodyImage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchwaterbodyImage.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default waterbodyImageSlice.reducer;




export const fetchwaterbodyImage = createAsyncThunk(
  "/waterbodyImageget/fetch",
  async ({ waterbody_id }) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/waterbody/GetPoolMedia/${waterbody_id}`,
      config
    );
    const CustomersData = res.data.data;
    return CustomersData;
  }
);




