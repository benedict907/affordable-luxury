import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import axiosInstance from "../utils/axiosInstance";

// Initial state
const initialState = {
  loading: false,
  error: null,
  success: null,
  deleteSuccess: false,
  pdfs: null,
  deleteId: null,
  updateSuccess: false,
  base64Img: null,
};

// API call using createAsyncThunk
export const getPdfs = createAsyncThunk(
  "getPdfs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/itinerary");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBase64 = createAsyncThunk(
  "createBase64",
  async (filename, { rejectWithValue }) => {
    console.log("createBase64", filename);
    try {
      const response = await axiosInstance.get("/api/itinerary/base64-image", {
        params: {
          filename, // Pass the filename as a parameter
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isAPendingAction = isPending(getPdfs, deletePdf, createBase64);
const isARejectedAction = isRejected(getPdfs, deletePdf, createBase64);
// const isUpdatedAction = isFulfilled

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    resetPage: (state) => {
      state.success = false;
    },
    updateClientList: (state, action) => {
      console.log("updateClientList", action);
      state.clients = action.payload;
      state.deleteId = null;
    },
    resetUpdateClientSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPdfs.fulfilled, (state, action) => {
      console.log("getPdfs.fulfilled", action);
      state.loading = false;
      state.deleteSuccess = false;
      state.pdfs = action.payload.data;
    });
    builder.addCase(deletePdf.fulfilled, (state, action) => {
      console.log("deletePdf.fulfilled", action);
      state.loading = false;
      state.deleteSuccess = true;

      alert(action.payload.message);
    });

    builder.addCase(createBase64.fulfilled, (state, action) => {
      console.log("createBase64.fulfilled", action);
      state.loading = false;
      state.base64Img = action.payload.base64;
    });
    builder.addMatcher(isAPendingAction, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addMatcher(isARejectedAction, (state, action) => {
      console.log("isARejectedAction", action.payload);
      // Alert.alert("", action.payload.message);
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});
export const { resetPage, updateClientList, resetUpdateClientSuccess } =
  clientSlice.actions;
export default clientSlice.reducer;
