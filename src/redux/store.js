import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import clientReducer from "./clientSlice";
import createPdfReducer from "./createPdfSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";
import { injectStore } from "../utils/axiosInstance";

// Define the root reducer by combining slices
const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  createPdf: createPdfReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"], // Specify which slices you want to persist
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }),
});

// Give the axios instance access to auth state without an import cycle
injectStore(store);

// Set up persistor
export const persistor = persistStore(store);

// Typed-style hooks used across the app
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
