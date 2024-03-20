import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


// Define the async thunk for posting customer data
export const postwaterbodyTypeData = createAsyncThunk(
  "postwaterbodyType/postData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/waterbodyType`,
        values,
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
  async ({ datas  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};

    const id = datas?.waterbody_id



    try {
      
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/waterbody/${id}`,
        datas,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create the Redux Toolkit slice
const postwaterbodyTypeSlice = createSlice({
  name: "postwaterbodyType",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postwaterbodyTypeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postwaterbodyTypeData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(postwaterbodyTypeData.rejected, (state, action) => {
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
      })
      .addCase(UpdatewaterbodyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload

      });
  },
});

export default postwaterbodyTypeSlice.reducer;
