import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postProductsData = createAsyncThunk(
  "postProducts/postData",
  async ({ Data }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/Item`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateProductsData = createAsyncThunk(
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
        `${process.env.REACT_APP_API_URL}/Item/${id}`,
        Data,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const DeleteProductsDataData = createAsyncThunk(
  "DeleteItem/updateserviceData",
  async ({ id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/Item/${id}`,
        config
      );
      

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the Redux Toolkit slice
const postProductsSlice = createSlice({
  name: "postProducts",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      state.data = null; // Reset the data to null or initial state
      state.loading = false; // Reset loading to false
      state.error = null; // Reset error to null
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postProductsData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submited Successfully";
      })
      .addCase(postProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      })

      .addCase(UpdateProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProductsData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Data Submited Successfully";
      })
      .addCase(UpdateProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      });
  },
});
export const { clearData } = postProductsSlice.actions;

export default postProductsSlice.reducer;
