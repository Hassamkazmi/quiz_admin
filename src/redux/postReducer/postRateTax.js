import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postRateTaxPostData = createAsyncThunk(
  "postRateTaxPost/postserviceData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/salesTax`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdateRateTaxPostData = createAsyncThunk(
  "postRateTaxPost/updateserviceData",
  async ({ id, value }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/SalesTaxGroup/${id}`,
        value,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateRateTaxEdittData = createAsyncThunk(
  "postRateTaxPost/updateSales",
  async ({ id, values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/salesTax/${id}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteRateTaxPostData = createAsyncThunk(
  "postRateTaxPost/deleteTax",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/salesTax/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postRateTaxPostSlice = createSlice({
  name: "postRateTaxPost",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRateTaxPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRateTaxPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postRateTaxPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateRateTaxPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateRateTaxPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Updated Successfully";
      })
      .addCase(UpdateRateTaxPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(DeleteRateTaxPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteRateTaxPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message;
      })
      .addCase(DeleteRateTaxPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(UpdateRateTaxEdittData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateRateTaxEdittData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message;
      })
      .addCase(UpdateRateTaxEdittData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { clearData } = postRateTaxPostSlice.actions;

export default postRateTaxPostSlice.reducer;
