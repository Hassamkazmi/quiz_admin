import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getEquipmemntSlice = createSlice({
  name: "getEquipmemnt",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetPoolEquipmemnt.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetPoolEquipmemnt.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetPoolEquipmemnt.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getEquipmemntSlice.reducer;






export const fetchgetPoolEquipmemnt = createAsyncThunk(
  "/getpoolEquipmemntget/fetch",
  async ({waterbody_id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/EquipmentWaterBody?waterbody_id=${waterbody_id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);




