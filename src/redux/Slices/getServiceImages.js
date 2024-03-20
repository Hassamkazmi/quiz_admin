import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getAllServiceImagesSlice = createSlice({
  name: "getAllServiceImages",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAllServiceImages.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllServiceImages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllServiceImages.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
     
  }
});

export default getAllServiceImagesSlice.reducer;





export const fetchgetAllServiceImages = createAsyncThunk(
  "/getAllServiceImagesget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/serviceImage?active_service_id=${id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);
