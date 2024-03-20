import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postrouteAssignmentData = createAsyncThunk(
  "postrouteAssignment/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/RouteAssignment`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateSinglerouteAssignmwnt = createAsyncThunk(
  "UpdateroutesingleAssignmwnt/updateData",
  async ({active_service_id, Data  }, { rejectWithValue }) => {

    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/RouteAssignment/${active_service_id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdaterouteAssignmwnt = createAsyncThunk(
  "UpdaterouteAssignmwnt/updateData",
  async ({active_service_id, Data  }, { rejectWithValue }) => {

    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/activeService/${active_service_id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdaterouteAssignmwntPosition = createAsyncThunk(
  "UpdaterouteAssignmwntpostion/updateDatapostion",
  async ({Data , id }, { rejectWithValue }) => {

    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/RouteAssignment/SwapRoute/${id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const ChangerouteAssignmwntTech = createAsyncThunk(
  "ChangerouteAssignmwntTech/updateDatapostion",
  async ({Data , active_service_id }, { rejectWithValue }) => {

    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/RouteAssignment/ChangeDayTech/${active_service_id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const EndrouteAssignmwnt = createAsyncThunk(
  "UpdaterouteAssignmwnt/updateData",
  async ({ service_id, Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/RouteAssignment/EndRouteAssignment/${service_id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleterouteAssignmentData = createAsyncThunk(
  "postrouteAssignment/updateserviceData",
  async ({ service_id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/RouteAssignment/${service_id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleterWaterBodyRouteAssignmentData = createAsyncThunk(
  "postrouteAssignment/updateserviceData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/RouteAssignment/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postrouteAssignmentSlice = createSlice({
  name: "postrouteAssignment",
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
      .addCase(postrouteAssignmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postrouteAssignmentData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Form Submitted Successfully";
      })
      .addCase(postrouteAssignmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdaterouteAssignmwnt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdaterouteAssignmwnt.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdaterouteAssignmwnt.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(ChangerouteAssignmwntTech.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ChangerouteAssignmwntTech.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(ChangerouteAssignmwntTech.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateSinglerouteAssignmwnt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateSinglerouteAssignmwnt.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateSinglerouteAssignmwnt.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});

export const { resetData } = postrouteAssignmentSlice.actions; // Export the clearData action

export default postrouteAssignmentSlice.reducer;