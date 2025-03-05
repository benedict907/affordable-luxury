import React from "react";
import { useState } from "react";

export default function FlightDetails() {
  const [arrivalCity, setArrivalCity] = useState();
  const [arrivalFlightNumber, setArrivalFlightNumber] = useState();
  const [arrivalTime, setArrivalTime] = useState();
  const [departureCity, setDepartureCity] = useState();
  const [departureFlightNumber, setDepartureFlightNumber] = useState();
  const [departureTime, setDepartureTime] = useState();

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10 flex-col">
      <h1 className="text-2xl font-bold mb-6">Flight Details</h1>
      <div className="flex">
        <div className="flex-col mr-4">
          <h1 className="mb-2">Arrival City</h1>
          <input
            type="text"
            id={`arrival-city`}
            name={`ArrivalCity`}
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex-col mr-4">
          <h1 className="mb-2">Flight Number</h1>
          <input
            type="text"
            id={`flight-number`}
            name={`FlightNumber`}
            value={arrivalFlightNumber}
            onChange={(e) => setArrivalFlightNumber(e.target.value)}
            className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex-col">
          <h1 className="mb-2">Time</h1>
          <input
            type="text"
            id={`arrival-time`}
            name={`ArrivalTime`}
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex-col mr-4">
          <h1 className="mb-2">Departure City</h1>
          <input
            type="text"
            id={`departure-city`}
            name={`DepartureCity`}
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex-col mr-4">
          <h1 className="mb-2">Flight Number</h1>
          <input
            type="text"
            id={`departure-flight`}
            name={`DepartureFlight`}
            value={departureFlightNumber}
            onChange={(e) => setDepartureFlightNumber(e.target.value)}
            className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex-col">
          <h1 className="mb-2">Time</h1>
          <input
            type="text"
            id={`departure-time`}
            name={`DepartureTime`}
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
    </div>
  );
}
