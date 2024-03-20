import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postwaterbodyImagesData = createAsyncThunk(
  "postwaterbodyImages/postData",
  async ({ formData , waterbody_id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/waterbody/AddPoolMedia/${waterbody_id}`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdatewaterbodyImagesData = createAsyncThunk(
  "updatewaterbody/updateData",
  async ({ id, Data }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("userToken");

      const config = {
        headers: {
          Authorization: token,
        },
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/AddPoolMedia/${id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const DeletewaterbodyImagesDataData = createAsyncThunk(
  "DeleteAddPoolMedia/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/AddPoolMedia/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the Redux Toolkit slice
const postwaterbodyImagesSlice = createSlice({
  name: "postwaterbodyImages",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postwaterbodyImagesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postwaterbodyImagesData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submitted Successfully";

      })
      .addCase(postwaterbodyImagesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      })

      .addCase(UpdatewaterbodyImagesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatewaterbodyImagesData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdatewaterbodyImagesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      });
  },
});
export const { clearData } = postwaterbodyImagesSlice.actions;

export default postwaterbodyImagesSlice.reducer;
