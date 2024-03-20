import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting itemType data
export const postitemTypeData = createAsyncThunk(
  "postsProductType/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/itemType`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateitemTypeData = createAsyncThunk(
  "updateitemType/updateData",
  async ({id, postData }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/itemType/${id}`,
        postData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const DeleteitemTypeData = createAsyncThunk(
  "postitemType/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/itemType/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postSProductTypeSlice = createSlice({
  name: "postsProductType",
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
      state.success;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postitemTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postitemTypeData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postitemTypeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(updateitemTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateitemTypeData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Updated Successfully";
      })
      .addCase(updateitemTypeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(DeleteitemTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteitemTypeData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message;
      })
      .addCase(DeleteitemTypeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { clearData } = postSProductTypeSlice.actions;
export default postSProductTypeSlice.reducer;
