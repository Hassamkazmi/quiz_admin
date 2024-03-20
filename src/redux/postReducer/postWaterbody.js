import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postwaterbodyData = createAsyncThunk(
  "postwaterbody/postData",
  async ({ pooldata }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const data = pooldata[0];

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/waterbody`,
        data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdatewaterbodyData = createAsyncThunk(
  "updatewaterbody/updateData",
  async ({ data1 , waterbody_id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/waterbody/${waterbody_id}`,
        data1,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the Redux Toolkit slice
const postwaterbodySlice = createSlice({
  name: "postwaterbody",
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
      .addCase(postwaterbodyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postwaterbodyData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(postwaterbodyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdatewaterbodyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatewaterbodyData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(UpdatewaterbodyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});


export const { resetData } = postwaterbodySlice.actions; // Export the clearData action

export default postwaterbodySlice.reducer;
