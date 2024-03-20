import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postTechnicianData = createAsyncThunk(
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
        `${process.env.REACT_APP_API_URL}/user`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updatedTechnicianData = createAsyncThunk(
  "postsCustomer/updateTechnician",
  async ({ id, Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteTechnicianData = createAsyncThunk(
  "postTechnicianData/updateTechnicianData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postTechnicianSlice = createSlice({
  name: "postTechnician",
  initialState: {
    data: null,
    loading: false,
    error: null,
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
      .addCase(postTechnicianData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTechnicianData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(postTechnicianData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(updatedTechnicianData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedTechnicianData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(updatedTechnicianData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postTechnicianSlice.actions; // Export the clearData action

export default postTechnicianSlice.reducer;
