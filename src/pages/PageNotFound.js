import { useNavigate } from "react-router-dom";
import React from "react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg w-full sm:w-3/4 max-w-6xl  min-h-[500px]">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          404 Page not found
        </h2>
        <div className="w-[150px]">
          <button
            onClick={() => navigate(-1)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-5"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
