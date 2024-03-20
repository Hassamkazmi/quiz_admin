import axios from 'axios'
import Cookies from 'js-cookie'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ values }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/owner/login`,
         values ,
        config
      )
      Cookies.set('userToken', data?.data)
      
      return data
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)



export const forgetPassword = createAsyncThunk(
  "user/forget",
  async ({ values }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/SuperAdmin/forget/password`,
        values,
        config
      );
      Cookies.set("userToken", data.data);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset",
  async ({ token, values }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/SuperAdmin/reset/password/${token}`,
        values,
        config
      );
      Cookies.set("userToken", data.data);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);