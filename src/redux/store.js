import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import clientReducer from "./clientSlice";
import createPdfReducer from "./createPdfSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, useSelector } from "react-redux";

// Define the root reducer by combining slices
const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  createPdf: createPdfReducer,
});
// Define RootState as the return type of rootReducer

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

// Set up persistor
export const persistor = persistStore(store);

// Define RootState and AppDispatch types based on the store itself
// export type RootState = ReturnType<typeof store.getState>;

// Custom hooks for useDispatch and useSelector with types
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
