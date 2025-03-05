import React, { useState } from "react";

const AddPassenger = ({ passengerList, setPassengerList }) => {
  const [passengerName, setPassengerName] = useState("");

  const handleAddPassenger = () => {
    if (passengerName.trim()) {
      setPassengerList([...passengerList, passengerName.trim()]);
      setPassengerName(""); // Clear the input field
    }
  };

  return (
    <div className="mt-10 flex flex-col">
      <label className="text-left mb-2 text-lg font-semibold">
        Passenger Names
      </label>
      <div className="flex items-center space-x-2">
        <input
          className="text-input border border-gray-300 rounded-lg p-2 flex-1"
          type="text"
          placeholder="Enter passenger name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
        />
        <button
          onClick={handleAddPassenger}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <div className="mt-4">
        {passengerList.map((name, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-3 mb-2 shadow-md flex justify-between items-center bg-white"
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPassenger;
