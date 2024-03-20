import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting workOrderTypeSetting data
export const postworkOrderTypeSettingData = createAsyncThunk(
  "postsworkOrderTypeSetting/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/workOrderType`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);





export const deleteworkOrderTypeSettingData = createAsyncThunk(
  "postsworkOrderTypeSetting/deleteData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/workOrderType/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editWorkOrderTypeData = createAsyncThunk(
  "editworkOrderType/editData",
  async ({ id, values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/workOrderType/${id}`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postSworkOrderTypeSettingSlice = createSlice({
  name: "postsworkOrderTypeSetting",
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
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postworkOrderTypeSettingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postworkOrderTypeSettingData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postworkOrderTypeSettingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(editWorkOrderTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editWorkOrderTypeData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editWorkOrderTypeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(deleteworkOrderTypeSettingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteworkOrderTypeSettingData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = action?.payload?.message;
      })
      .addCase(deleteworkOrderTypeSettingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
        state.success = null;
      });
  },
});
export const { resetData } = postSworkOrderTypeSettingSlice.actions; // Export the clearData action

export default postSworkOrderTypeSettingSlice.reducer;
