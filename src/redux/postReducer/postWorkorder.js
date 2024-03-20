import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postworkorderData = createAsyncThunk(
  "postworkorder/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/workOrder`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdateWorkOrderData = createAsyncThunk(
  "updatewaterbodydata/updateData",
  async ({ Data , service_id  }, { rejectWithValue }) => {

    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/workOrder/${service_id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const DeletewaterbodyWorkOrdertData = createAsyncThunk(
  "postwaterbodyworkOrder/updateserviceData",
  async ({ data  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    const id = data;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/workOrder/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Create the Redux Toolkit slice
const postworkorderSlice = createSlice({
  name: "postworkorder",
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
      .addCase(postworkorderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postworkorderData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;

        state.success = "Form Submitted Successfully";
      })
      .addCase(postworkorderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateWorkOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateWorkOrderData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(UpdateWorkOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postworkorderSlice.actions; // Export the clearData action

export default postworkorderSlice.reducer;
