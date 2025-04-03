import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Define an interface for the state

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: "",
  isLoggedIn: false,
  userDetails: null,
  accessToken: null,
  isDrawerOpen: false,
};

// const baseURL = 'http://127.0.0.1';

// API call using createAsyncThunk
export const login = createAsyncThunk(
  "login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/v1/login", loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isAPendingAction = isPending(login);
const isARejectedAction = isRejected(login);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userDetails = payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = null;
    },
    toggleDrawer: (state, { payload }) => {
      state.isDrawerOpen = payload;
    },
    resetPage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login.fulfilled", action);
      state.loading = false;
      state.isLoggedIn = true;
    });

    builder.addMatcher(isAPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addMatcher(isARejectedAction, (state, action) => {
      console.log("login.isARejectedAction", action);
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload.message;
    });
  },
});
export const { loginSuccess, logoutSuccess, toggleDrawer, resetPage } =
  authSlice.actions;

export default authSlice.reducer;
// selectors.js
export const selectUser = (state) => state.auth;
