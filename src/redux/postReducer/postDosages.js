import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postdosagesData = createAsyncThunk(
  "postdosages/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/dosage`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updatedosagesData = createAsyncThunk(
  "Editdosages/postData",
  async ({id, Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/dosage/${id}`,
        Data,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const DeletedosagesDataData = createAsyncThunk(
  "DeleteDoseges/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/dosage/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const DeleteSingleDosagesDataData = createAsyncThunk(
  "DeletesingleDosage/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/dosage/value/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Create the Redux Toolkit slice
const postdosagesSlice = createSlice({
  name: "postdosages",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
    deletedMessage: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.deletedMessage = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postdosagesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postdosagesData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";
      })
      .addCase(postdosagesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(updatedosagesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedosagesData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Update Successfully";
      })
      .addCase(updatedosagesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(DeletedosagesDataData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeletedosagesDataData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message;
      })
      .addCase(DeletedosagesDataData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(DeleteSingleDosagesDataData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteSingleDosagesDataData.fulfilled, (state, action) => {
        state.data = action?.payload;
        state.loading = false;
        state.error = null;
        state.deletedMessage = action.payload.message;
      })
      .addCase(DeleteSingleDosagesDataData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postdosagesSlice.actions; // Export the clearData action

export default postdosagesSlice.reducer;
