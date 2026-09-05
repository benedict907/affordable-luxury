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
  deleteSuccess: false,
  pdfs: null,
  base64Img: null,
};

export const getPdfs = createAsyncThunk(
  "getPdfs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/itinerary");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? { message: "Network error. Please try again." }
      );
    }
  }
);

export const deletePdf = createAsyncThunk(
  "deletePdf",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/itinerary/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? { message: "Network error. Please try again." }
      );
    }
  }
);

export const createBase64 = createAsyncThunk(
  "createBase64",
  async (filename, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/itinerary/base64-image", {
        params: { filename },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? { message: "Network error. Please try again." }
      );
    }
  }
);

const isAPendingAction = isPending(getPdfs, deletePdf, createBase64);
const isARejectedAction = isRejected(getPdfs, deletePdf, createBase64);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPdfs.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteSuccess = false;
      state.pdfs = action.payload.data;
    });
    builder.addCase(deletePdf.fulfilled, (state) => {
      state.loading = false;
      state.deleteSuccess = true;
    });
    builder.addCase(createBase64.fulfilled, (state, action) => {
      state.loading = false;
      state.base64Img = action.payload.base64;
    });
    builder.addMatcher(isAPendingAction, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(isARejectedAction, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message ?? "Something went wrong.";
    });
  },
});

export default clientSlice.reducer;
