import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postSalesTaxGroupPostData = createAsyncThunk(
  "postSalesTaxGroupPost/postserviceData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/SalesTaxGroup`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdateSalesTaxGroupPostData = createAsyncThunk(
  "postSalesTaxGroupPost/updateserviceData",
  async ({ values , item_needed_id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/SalesTaxGroup/${item_needed_id}`,
        values ,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const DeleteSalesTaxGroupPostData = createAsyncThunk(
  "postSalesTaxGroupPost/deleteData",
  async ({ id }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/SalesTaxGroupName/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the Redux Toolkit slice
const postSalesTaxGroupPostSlice = createSlice({
  name: "postSalesTaxGroupPost",
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
      .addCase(postSalesTaxGroupPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSalesTaxGroupPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postSalesTaxGroupPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateSalesTaxGroupPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateSalesTaxGroupPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateSalesTaxGroupPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(DeleteSalesTaxGroupPostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteSalesTaxGroupPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.error = action?.payload?.message;
      })
      .addCase(DeleteSalesTaxGroupPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postSalesTaxGroupPostSlice.actions;
export default postSalesTaxGroupPostSlice.reducer;
