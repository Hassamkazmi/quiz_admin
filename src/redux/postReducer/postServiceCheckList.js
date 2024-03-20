import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";



// Define the async thunk for posting customer data
export const postserviceCheckListData = createAsyncThunk(
  "postserviceCheckList/postserviceData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {


      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/CheckList`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const postserviceCheckListWaterbodyData = createAsyncThunk(
  "postserviceCheckListwaterbody/postserviceData",
  async ({ values }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {


      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/serviceChecklist`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const UpdateserviceCheckListData = createAsyncThunk(
  "postserviceCheckList/updateserviceData",
  async ({ values , checklist_id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/CheckList/${checklist_id}`,
        values ,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const UpdateserviceCheckListwaterbodyData = createAsyncThunk(
  "postserviceCheckListwaterbody/updateserviceData",
  async ({ values , checklist_id  }, { rejectWithValue }) => {
    const token = Cookies.get("userToken");

const config = {
  headers: {
    Authorization: token,
  },
};
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/serviceChecklist/${checklist_id}`,
        values ,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




export const DeleteserviceCheckListData = createAsyncThunk(
  "postserviceCheckList/deleteServiceChecklist",
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
        `${process.env.REACT_APP_API_URL}/CheckList/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Create the Redux Toolkit slice
const postserviceCheckListSlice = createSlice({
  name: "postserviceCheckList",
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
      .addCase(postserviceCheckListData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;

      })
      .addCase(postserviceCheckListData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message;
      })
      .addCase(postserviceCheckListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })

      .addCase(UpdateserviceCheckListData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateserviceCheckListData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message;
      })
      .addCase(UpdateserviceCheckListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      })
      .addCase(DeleteserviceCheckListData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteserviceCheckListData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = action.payload.message; 
      })
      .addCase(DeleteserviceCheckListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message; // Access the error message from the payload
      });
  },
});
export const { resetData } = postserviceCheckListSlice.actions; // Export the clearData action

export default postserviceCheckListSlice.reducer;
