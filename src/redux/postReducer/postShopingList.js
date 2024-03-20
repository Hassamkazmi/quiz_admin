import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postShopinglistData = createAsyncThunk(
  "postsCustomer/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/item`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateShopinglistData = createAsyncThunk(
  "updateShopinglistData/postData",
  async ({ Data, id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/item/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteShopinglistData = createAsyncThunk(
  "postShopinglistData/updateShopinglistData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/item/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postShopinglistSlice = createSlice({
  name: "postShopinglist",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null; // Reset error to null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShopinglistData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postShopinglistData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(postShopinglistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(updateShopinglistData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShopinglistData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(updateShopinglistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postShopinglistSlice.actions; // Export the clearData action

export default postShopinglistSlice.reducer;
