import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getitemNeededDataSlice = createSlice({
  name: "getitemNeededData",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetitemNeededDataAll.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetitemNeededDataAll.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetitemNeededDataAll.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchSingleitemNeededShoping.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchSingleitemNeededShoping.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchSingleitemNeededShoping.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getitemNeededDataSlice.reducer;



export const fetchgetitemNeededDataAll = createAsyncThunk(
  "/getitemNeededDataget/fetch",
  async ({waterbody_id}) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token
      }
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/item?waterbody_id=${waterbody_id}`,
        config
      );0
      const CustomersData = res.data.result;
      return CustomersData.items;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to let the Redux Toolkit handle it
    }
  }
);


export const fetchgetitemNeededShoping = createAsyncThunk(
  "/getitemNeededDataget/fetch",
  async ({ name, page, isPurchased, isbilled }) => {
    const token = Cookies.get("userToken");

    const config = {
      Authorization: token,
    };


    // const params = {}
    // if (isPurchased != "") params.isPurchased = isPurchased;
    // if (isbilled !== "") params.isbilled = isbilled;
    // if (page != "") params.page = page;

    // config.params = params;

    const queryParams = {
      ...(name && { name }),
      ...(page && { page }),

      ...(isPurchased && { isPurchased }),
      ...(isbilled && { isbilled }),
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/item`,
        {
          params: queryParams,
          headers: config,
        }
      );
      const CustomersData = res.data.result;
      return CustomersData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to let the Redux Toolkit handle it
    }
  }
);



export const fetchSingleitemNeededShoping = createAsyncThunk(
  "/singleitemNeededDataget/fetch",
  async ({id}) => {

    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token
      }
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/item/${id}`,
        config
      );
      const CustomersData = res.data.data;
      return CustomersData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to let the Redux Toolkit handle it
    }
  }
)