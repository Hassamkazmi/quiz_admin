import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postItemNeedePostData = createAsyncThunk(
  "postItemNeedePost/postserviceData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/item`,
        values,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdateItemNeedePostData = createAsyncThunk(
  "postItemNeedePost/updateserviceData",
  async ({ values , item_needed_id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/item/${item_needed_id}`,
        values ,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const DeleteItemNeedePostData = createAsyncThunk(
  "postItemNeedePost/updateserviceData",
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
        `${process.env.REACT_APP_API_URL}/item/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Create the Redux Toolkit slice
const postItemNeedePostSlice = createSlice({
  name: "postItemNeedePost",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postItemNeedePostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postItemNeedePostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postItemNeedePostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      })

      .addCase(UpdateItemNeedePostData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateItemNeedePostData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateItemNeedePostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      })

   

  },
});

export default postItemNeedePostSlice.reducer;
