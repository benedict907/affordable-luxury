import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

// Redirects unauthenticated visitors to /login before a protected page renders.
const RequireAuth = ({ children }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default RequireAuth;
