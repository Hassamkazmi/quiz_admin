import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Define the async thunk for posting customer data
export const postwaterbodyequipmwntData = createAsyncThunk(
  "postwaterbodyequipmwnt/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/EquipmentWaterBody`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postequipmwntData = createAsyncThunk(
  "postwaterbodyequipmwntnew/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/equipment`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateEquiptmentData = createAsyncThunk(
  "updateequiprmentwaterbody/updateData",
  async ({ id, values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/equipment/${id}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeletewaterbodyEquipmenttData = createAsyncThunk(
  "postwaterbodyEquipmentt/deleteData",
  async ({ id }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.request({
        url: `${process.env.REACT_APP_API_URL}/equipment/waterbody/${id}`,
        method: 'delete',
        headers: config.headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const DeleteEquipmenttData = createAsyncThunk(
  "postwaterbodyEquipmentt/deleteData",
  async ({ data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.request({
        url: `${process.env.REACT_APP_API_URL}/equipment/${data}`,
        method: 'delete',
    
        headers: config.headers,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postwaterbodyequipmwntSlice = createSlice({
  name: "postwaterbodyequipmwnt",
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
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postwaterbodyequipmwntData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postwaterbodyequipmwntData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";

      })
      .addCase(postwaterbodyequipmwntData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(postequipmwntData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postequipmwntData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";

      })
      .addCase(postequipmwntData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateEquiptmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateEquiptmentData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateEquiptmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postwaterbodyequipmwntSlice.actions; // Export the clearData action

export default postwaterbodyequipmwntSlice.reducer;
