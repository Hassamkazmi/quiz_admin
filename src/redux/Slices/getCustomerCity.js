import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading"
});

const getCustomerCitySlice = createSlice({
  name: "getCustomerCity",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetCustomerCity.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetCustomerCity.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetCustomerCity.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetAllCity.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllCity.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllCity.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchgetAllCityByCountry.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetAllCityByCountry.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetAllCityByCountry.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  }
});

export default getCustomerCitySlice.reducer;




export const fetchgetCustomerCity = createAsyncThunk(
  "/getCustomerCityget/fetch",
  async ({id}) => {
    const token = Cookies.get("userToken");
const config = {
  headers: {
    Authorization: token
  }
};
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/city?state_id=${id}&size=300`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);

export const fetchgetAllCity = createAsyncThunk(
  "/getAllCityget/fetch",
  async (name) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/city?name=${name ? name : ""}&size=20`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);

export const fetchgetAllCityByCountry = createAsyncThunk(
  "/getAllCityByCountryget/fetch",
  async ({countryid,name}) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/city/CityWithRespectedCountry/${countryid}?name=${name ? name : ""}&size=20`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData.items;
  }
);




