import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const waterbodySlice = createSlice({
  name: "waterbody",
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchwaterbody.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchwaterbody.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchwaterbody.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  }
});

export default waterbodySlice.reducer;




export const fetchwaterbody = createAsyncThunk(
  "/waterbodyget/fetch",
  async ({ServiceLocationID}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/waterbody?service_location_id=${ServiceLocationID}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);




