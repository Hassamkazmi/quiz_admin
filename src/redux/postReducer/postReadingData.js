import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postReadingData = createAsyncThunk(
  "postReading/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reading`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateReadings = createAsyncThunk(
  "updateReadings/updateReadings",
  async ({ id, Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/reading/${id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const DeleteReadingDataData = createAsyncThunk(
  "DeleteReading/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/reading/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const DeleteSingleReadingDataData = createAsyncThunk(
  "DeletesingleReading/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/reading/value/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the Redux Toolkit slice
const postReadingSlice = createSlice({
  name: "postReading",
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
      state.success= null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReadingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReadingData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postReadingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(updateReadings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReadings.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Updated Successfully";
      })
      .addCase(updateReadings.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(DeleteSingleReadingDataData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteSingleReadingDataData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(DeleteSingleReadingDataData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });


  },
});
export const { resetData } = postReadingSlice.actions; // Export the clearData action

export default postReadingSlice.reducer;
