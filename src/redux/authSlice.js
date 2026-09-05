import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const initialState = {
  loading: false,
  error: null,
  isLoggedIn: false,
  userDetails: null,
  accessToken: null,
};

export const login = createAsyncThunk(
  "login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/v1/login", loginData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? { message: "Network error. Please try again." }
      );
    }
  }
);

const isAPendingAction = isPending(login);
const isARejectedAction = isRejected(login);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userDetails = payload ?? null;
      // Store the token when the API provides one so the axios interceptor
      // can attach it; stays null otherwise.
      state.accessToken = payload?.accessToken ?? payload?.token ?? null;
    });

    builder.addMatcher(isAPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addMatcher(isARejectedAction, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload?.message ?? "Something went wrong.";
    });
  },
});

export const { logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
