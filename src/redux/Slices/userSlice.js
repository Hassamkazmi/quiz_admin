import Cookies from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'
// import { getUserDetails, registerUser, userLogin } from './userActions'
import { forgetPassword, resetPassword, userLogin } from "../postReducer/userPost";

const token = Cookies.get("UserPost") ? Cookies.get("UserPost") : null;

const initialState = {
  loading: false,
  userInfo: null,
  token,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("UserPost");
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
    },
    reset: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.token = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [forgetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.token = payload.token;
      state.success = payload.message;
      console.log(state.success);
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.token = payload.token;
      state.success = payload.message;
      console.log(state.success);
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, reset } = userSlice.actions;


export default userSlice.reducer