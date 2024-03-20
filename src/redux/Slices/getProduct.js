import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getProductDataSlice = createSlice({
  name: "getProductData",
  initialState: {
    data: [],
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchgetProductData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchgetProductData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchgetProductData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getProductDataSlice.reducer;

export const fetchgetProductData = createAsyncThunk(
  "/getProductDataget/fetch",
  async ({ name, itemId, page }) => {
    const token = Cookies.get("userToken");

    const config = {
      Authorization: token,
    };

    const queryParams = {
      ...(name && { name }),
      ...(itemId && { item_type_id: itemId }),
      ...(page && { page }),
    };
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/Item`, {
      params: queryParams,
      headers: config,
    });
    const product = res.data.result;
    return product;
  }
);

export const fetchgetProductByType = createAsyncThunk(
  "/getProductDataget/fetch",
  async ({ item_type_id, currentPage }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/Item?item_type_id=${item_type_id}&page=${currentPage}`,
      config
    );
    const CustomersData = res.data.result;
    return CustomersData;
  }
);





