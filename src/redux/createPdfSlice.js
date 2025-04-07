import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import axiosInstance from "../utils/axiosInstance";
import { setValueByKeyPath } from "../helper";

// Initial state
const initialState = {
  loading: false,
  error: null,
  success: null,
  errors: {
    main: {
      title: "",
      numberOfDays: "",
    },
    flights: {
      arrivalCity: "",
      arrivalFlightNumber: "",
      arrivalTime: "",
      departureCity: "",
      departureFlightNumber: "",
      departureTime: "",
    },
    emergencyContacts: {
      emergencyContactKerala: "",
      emergencyNumberUK: "",
    },
    transportation: [
      {
        transfers: "",
        service: "",
        status: "",
      },
    ],
    hotelItinerary: [
      {
        hotelName: "",
        roomType: "",
        duration: "",
        rooms: "",
        mealPlan: "",
        status: "",
      },
    ],
    groundItinerary: [
      {
        dailyTasks: [{ time: "", task: "", description: "", bulletPoints: "" }],
      },
    ],
    importantPoints: "",
    travelTips: "",
  },
  imageName: null,
  main: {
    title: "",
    emergencyContact: "",
    emergencyNumber: "",
    numberOfDays: "",
  },
  flights: {
    arrivalCity: "",
    arrivalFlightNumber: "",
    arrivalTime: "",
    departureCity: "",
    departureFlightNumber: "",
    departureTime: "",
  },
  emergencyContacts: {
    emergencyContactKerala: "",
    emergencyNumberUK: "",
  },
  transportation: [
    {
      transfers: "",
      service: "Private Car - English Speaking Driver",
      status: "OK",
    },
  ],
  hotelItinerary: [
    {
      hotelName: "",
      roomType: "",
      duration: "",
      rooms: "1",
      mealPlan: "",
      status: "Confirmed",
    },
  ],
  groundItinerary: [
    {
      dailyTasks: [{ time: "", task: "", description: "", bulletPoints: "" }],
    },
  ],
  importantPoints: "",
  travelTips: "",
  customBulletPoint: { title: "", bulletPoints: "" },
};

// API call using createAsyncThunk
export const savePdf = createAsyncThunk(
  "savePdf",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/itinerary", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPdf = createAsyncThunk(
  "editPdf",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/api/itinerary/${data.pdfId}`,
        data.formData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const isAPendingAction = isPending(savePdf, editPdf);
const isARejectedAction = isRejected(savePdf, editPdf);
// const isUpdatedAction = isFulfilled

const createPdfSlice = createSlice({
  name: "createPdf",
  initialState,
  reducers: {
    resetPage: (state) => {
      return {
        ...initialState,
        success: false,
      };
    },

    deleteHotel: (state, action) => {
      const index = action.payload;
      state.hotelItinerary = state.hotelItinerary.filter((_, i) => i !== index);
    },
    deleteTransport: (state, action) => {
      const index = action.payload;
      state.transportation = state.transportation.filter((_, i) => i !== index);
    },
    setEditData: (state, action) => {
      const {
        imageName,
        main,
        flights,
        emergencyContacts,
        transportation,
        hotelItinerary,
        groundItinerary,
        importantPoints,
        travelTips,
        customBulletPoint,
      } = action.payload;

      state.imageName = imageName;
      state.main = main;
      state.flights = flights;
      state.emergencyContacts = emergencyContacts;
      state.transportation = transportation;
      state.hotelItinerary = hotelItinerary;
      state.groundItinerary = groundItinerary;
      state.importantPoints = importantPoints;
      state.travelTips = travelTips;
      state.customBulletPoint = customBulletPoint;
    },
    setPackageData: (state, action) => {
      const { payload } = action;
      state.main = payload;
      state.errors.main.title = "";
      state.errors.main.numberOfDays = "";
    },

    setHotels: (state, action) => {
      const { payload } = action;
      state.hotelItinerary = payload;
    },

    setFlightDetails: (state, action) => {
      const { payload } = action;
      state.flights = payload;
      state.errors.flights.arrivalCity = "";
      state.errors.flights.arrivalFlightNumber = "";
      state.errors.flights.arrivalTime = "";
      state.errors.flights.departureCity = "";
      state.errors.flights.departureFlightNumber = "";
      state.errors.flights.departureTime = "";
    },

    setTransport: (state, action) => {
      const { payload } = action;
      state.transportation = payload;
    },
    setEmergencyContacts: (state, action) => {
      const { payload } = action;
      state.emergencyContacts = payload;
    },
    setDays: (state, action) => {
      const { payload } = action;
      state.groundItinerary = payload;
    },
    setImportantPoints: (state, action) => {
      const { payload } = action;
      state.importantPoints = payload;
    },
    setCustomBulletPoints: (state, action) => {
      const { payload } = action;
      state.customBulletPoint = payload;
    },
    setTravelTips: (state, action) => {
      const { payload } = action;
      state.travelTips = payload;
    },
    setImage: (state, action) => {
      const { payload } = action;
      state.imageName = payload;
    },
    setErrors: (state, action) => {
      const { key, error } = action.payload;
      setValueByKeyPath(state.errors, key, error);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(savePdf.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.pdfs = action.payload.data;
    });
    builder.addCase(editPdf.fulfilled, (state, action) => {
      console.log("editPdf.fulfilled", action);
      state.loading = false;
      state.success = true;
      state.pdfs = action.payload.data;
      alert(action.payload.message);
    });

    builder.addMatcher(isAPendingAction, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addMatcher(isARejectedAction, (state, action) => {
      console.log("isARejectedAction", action.payload);
      state.loading = false;
      state.success = false;
      state.error = action.payload.error;
      alert(action.payload.error);
    });
  },
});
export const {
  resetPage,
  setPackageData,
  setHotels,
  setFlightDetails,
  setTransport,
  setEmergencyContacts,
  setDays,
  setImportantPoints,
  setTravelTips,
  setCustomBulletPoints,
  setErrors,
  setEditData,
  deleteHotel,
  setImage,
  deleteTransport,
} = createPdfSlice.actions;
export default createPdfSlice.reducer;
