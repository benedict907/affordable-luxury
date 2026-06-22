import { useNavigate } from "react-router-dom";
import React from "react";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg w-full sm:w-3/4 max-w-6xl min-h-[500px] p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Contact Us</h2>

        <div className="text-center text-gray-600 space-y-3">
          <p>
            <span className="font-medium text-gray-800">Email: </span>
            <a
              href="mailto:info@travelbugvoucher.com"
              className="text-blue-600 hover:underline"
            >
              info@travelbugvoucher.com
            </a>
          </p>
          <p>
            <span className="font-medium text-gray-800">Phone: </span>
            +44 0000 000000
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-8"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
