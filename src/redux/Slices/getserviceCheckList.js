import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getserviceCheckListSlice = createSlice({
  name: "getserviceCheckList",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetserviceCheckList.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetserviceCheckList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetserviceCheckList.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })

 
  }
});

export default getserviceCheckListSlice.reducer;



export const fetchgetserviceCheckList = createAsyncThunk(
  "/getserviceCheckListget/fetch",
  async ({waterbody_id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};


    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/serviceChecklist?waterbody_id=${waterbody_id}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);




export const fetchgetserviceCheckListAll = createAsyncThunk(
  "/getserviceCheckListget/fetch",
  async ({ Description, page }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(Description && { Description }),
      ...(page && { page }),
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/serviceChecklist`,
      {
        params: queryParams,
        headers: config,
      }
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);




export const fetchgetCheckListAll = createAsyncThunk(
  "/getserviceCheckListget/fetch",
  async ({ Description, page }) => {
    const token = Cookies.get("userToken");
    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(Description && { Description }),
      ...(page && { page }),
    };

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/checklist`, {
      params: queryParams,
      headers: config,
    });
    const CustomersData = res.data.result;
    return CustomersData;
  }
);