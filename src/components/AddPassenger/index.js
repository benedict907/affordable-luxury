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
      <div className="flex items-center gap-2">
        <input
          className="text-input flex-1"
          type="text"
          placeholder="Enter passenger name"
          value={passengerName}
          onChange={(e) => setPassengerName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddPassenger();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddPassenger}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
      <div className="mt-4">
        {passengerList.map((name, index) => (
          <div
            key={index}
            className="tile mb-2 flex items-center justify-between px-4 py-3"
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPassenger;
