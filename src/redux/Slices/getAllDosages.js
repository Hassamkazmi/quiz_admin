import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getAlldosageSlice = createSlice({
  name: "getAlldosage",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetAlldosage.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAlldosage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAlldosage.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetAlldosageUsed.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAlldosageUsed.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAlldosageUsed.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getAlldosageSlice.reducer;





export const fetchgetAlldosage = createAsyncThunk(
  "/getAlldosageget/fetch",
  async ({ name, price_per_unit, page }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };
    const queryParams = {
      ...(name && { name }),
      ...(price_per_unit && { price_per_unit }),
      ...(page && { page }),
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/dosage`, {
      params: queryParams,
      headers: config,
    });
    const CustomersData = res.data.result;
    return CustomersData;
  }
);



export const fetchgetAlldosageUsed = createAsyncThunk(
  "/getAlldosagegetused/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/dosageUsed?active_service_id=${id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);
