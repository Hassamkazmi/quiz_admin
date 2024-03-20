import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getCSVDataSlice = createSlice({
  name: "getCSVData",
  initialState: {
    data: [],
    isloading: false,
    statusdata: STATUSES.IDLE,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
        state.isloading = true;
      })
      .addCase(fetchCustomerCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
        state.isloading = false;
      })
      .addCase(fetchCustomerCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
        state.isloading = false;
      })

      .addCase(fetchUserCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchUserCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchUserCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })

      .addCase(fetchEquiptmentCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchEquiptmentCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchEquiptmentCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })

      .addCase(fetchDosageCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchDosageCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchDosageCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })

      .addCase(fetchReadingCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchReadingCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchReadingCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchProductCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchProductCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchProductCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchWorkOrderTypeCSVData.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchWorkOrderTypeCSVData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchWorkOrderTypeCSVData.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      })
      .addCase(fetchCheckListCsv.pending, (state, action) => {
        state.statusdata = STATUSES.LOADING;
      })
      .addCase(fetchCheckListCsv.fulfilled, (state, action) => {
        state.data = action.payload;
        state.statusdata = STATUSES.IDLE;
      })
      .addCase(fetchCheckListCsv.rejected, (state, action) => {
        state.statusdata = STATUSES.ERROR;
      });
  },
});

export default getCSVDataSlice.reducer;

export const fetchCustomerCSVData = createAsyncThunk(
  "/fetchCustomerCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/customer/csv/listing`,
      config
    );
    const CustomersData = res.data.data;

    return CustomersData;
  }
);

export const fetchUserCSVData = createAsyncThunk(
  "/fetchUserCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/csv/listing`,
      config
    );

    console.log(res.data, "res");
    const UsersData = res.data.result.users;
    return UsersData;
  }
);

export const fetchEquiptmentCSVData = createAsyncThunk(
  "/fetchEquiptmentCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/equipment/csv/listing`,
      config
    );
    console.log(res, "<====res");
    const EquipmentData = res.data.result.data;
    return EquipmentData;
  }
);

export const fetchDosageCSVData = createAsyncThunk(
  "/fetchDosageCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/dosage/csv/listing`,
      config
    );
    console.log(res.data, "res");
    const DosagesData = res.data.result.data;
    return DosagesData;
  }
);

export const fetchReadingCSVData = createAsyncThunk(
  "/fetchReadingCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/reading/csv/listing`,
      config
    );
    console.log(res.data, "res");
    const readingData = res.data.result.data;
    return readingData;
  }
);

export const fetchProductCSVData = createAsyncThunk(
  "/fetchProductCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/item/csv/listing`,
      config
    );

    console.log(res.data.data, "<=====res.data.result.data");
    const itemData = res.data.data;
    return itemData;
  }
);

export const fetchWorkOrderTypeCSVData = createAsyncThunk(
  "/fetchWorkOrderTypeCSVData/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/workOrderType/csv/listing`,
      config
    );

    console.log(res.data.data, "<=====res.data.result.data");
    const workOrderTypeData = res.data.data;
    return workOrderTypeData;
  }
);

export const fetchCheckListCsv = createAsyncThunk(
  "/fetchCheckList/fetch",
  async () => {
    const token = Cookies.get("userToken");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/CheckList/csv/list`,
      config
    );

    console.log(res.data.data, "<=====res.data.result.data");
    const workOrderTypeData = res.data.data;
    return workOrderTypeData;
  }
);
