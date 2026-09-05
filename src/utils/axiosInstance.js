import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

// The store is injected from redux/store.js instead of imported, so this
// module doesn't participate in the slices -> axiosInstance -> store cycle.
let store;
export const injectStore = (injectedStore) => {
  store = injectedStore;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = store?.getState().auth.accessToken;
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired/invalid: clear auth state. Plain action type avoids
      // importing authSlice (which imports this module).
      store?.dispatch({ type: "auth/logoutSuccess" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
