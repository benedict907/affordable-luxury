import { useNavigate } from "react-router-dom";
import React from "react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="app-page flex items-center justify-center">
      <div className="card flex w-full max-w-md flex-col items-center p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Error 404
        </p>
        <h2 className="page-title mt-2 text-2xl">Page not found</h2>
        <p className="page-subtitle mt-1">
          The page you're looking for doesn't exist or has moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary mt-8 w-full"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
