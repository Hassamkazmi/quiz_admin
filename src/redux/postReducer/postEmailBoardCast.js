import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk for posting customer data
export const postEmailboardcastData = createAsyncThunk(
  "postEmailboardcast/postData",
  async ({ Tags }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/emails/BroadCastEmailCustomersSearchingForTags`,
        Tags,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const postEmailboardcastDatabyDate = createAsyncThunk(
  "postEmailboardcastbydate/postData",
  async ({ newdate,tech }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/emails/BroadCastEmailCustomersSearchingForServiceDate?date=${newdate}&technician_id=${tech}`,
        newdate,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const postEmailboardcastDatabyDay = createAsyncThunk(
  "postEmailboardcastbyday/postData",
  async ({ dayData,tech}, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = { assigned_date: dayData };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/customer/emails/BroadCastEmailCustomersSearchingForRouteAssignmentDays?technician_id=${tech}`,
        data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Create the Redux Toolkit slice
const postEmailboardcastSlice = createSlice({
  name: "postEmailboardcast",
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEmailboardcastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEmailboardcastData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postEmailboardcastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(postEmailboardcastDatabyDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEmailboardcastDatabyDate.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postEmailboardcastDatabyDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(postEmailboardcastDatabyDay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEmailboardcastDatabyDay.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postEmailboardcastDatabyDay.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });

  },
});
export const { resetData } = postEmailboardcastSlice.actions; // Export the clearData action

export default postEmailboardcastSlice.reducer;
