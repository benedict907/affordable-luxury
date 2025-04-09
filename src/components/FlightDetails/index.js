import React, { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setFlightDetails } from "../../redux/createPdfSlice";

const FlightDetails = forwardRef((props, ref) => {
  const flightDetails = useAppSelector((state) => state.createPdf.flights);
  const error = useAppSelector((state) => state.createPdf.errors.flights);
  const dispatch = useAppDispatch();
  const {
    arrivalCity,
    arrivalFlightNumber,
    arrivalTime,
    departureCity,
    departureFlightNumber,
    departureTime,
  } = flightDetails || {};
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10 flex-col">
      <h1 className="text-2xl font-bold mb-6">Flight Details</h1>
      <div className="flex">
        <div className="flex-col mr-4">
          <h1 className="mb-2">Arrival City*</h1>
          <input
            ref={ref["flights.arrivalCity"]}
            type="text"
            id={`arrival-city`}
            name={`ArrivalCity`}
            value={arrivalCity}
            onChange={(e) =>
              dispatch(
                setFlightDetails({
                  ...flightDetails,
                  arrivalCity: e.target.value,
                })
              )
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5">{error.arrivalCity}</div>
        </div>

        <div className="flex-col mr-4">
          <h1 className="mb-2">Flight Number*</h1>
          <input
            ref={ref["flights.arrivalFlightNumber"]}
            type="text"
            id={`flight-number`}
            name={`FlightNumber`}
            value={arrivalFlightNumber}
            onChange={(e) =>
              dispatch(
                setFlightDetails({
                  ...flightDetails,
                  arrivalFlightNumber: e.target.value,
                })
              )
            }
            className="w-full px-3 py-2  border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5">{error.arrivalFlightNumber}</div>
        </div>

        <div className="flex-col">
          <h1 className="mb-2">Time*</h1>
          <input
            ref={ref["flights.arrivalTime"]}
            type="text"
            id={`arrival-time`}
            name={`ArrivalTime`}
            value={arrivalTime}
            onChange={(e) =>
              dispatch(
                setFlightDetails({
                  ...flightDetails,
                  arrivalTime: e.target.value,
                })
              )
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5">{error.arrivalTime}</div>
        </div>
      </div>
      <div className="flex">
        <div className="flex-col mr-4">
          <h1 className="mb-2">Departure City*</h1>
          <input
            ref={ref["flights.departureCity"]}
            type="text"
            id={`departure-city`}
            name={`DepartureCity`}
            value={departureCity}
            onChange={(e) =>
              dispatch(
                setFlightDetails({
                  ...flightDetails,
                  departureCity: e.target.value,
                })
              )
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5 mt-2">{error.departureCity}</div>
        </div>

        <div className="flex-col mr-4">
          <h1 className="mb-2">Flight Number*</h1>
          <input
            ref={ref["flights.departureFlightNumber"]}
            type="text"
            id={`departure-flight`}
            name={`DepartureFlight`}
            value={departureFlightNumber}
            onChange={(e) =>
              dispatch(
                setFlightDetails({
                  ...flightDetails,
                  departureFlightNumber: e.target.value,
                })
              )
            }
            className="w-full px-3 py-2  border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mt-2">{error.departureFlightNumber}</div>
        </div>

        <div className="flex-col">
          <h1 className="mb-2">Time*</h1>
          <input
            ref={ref["flights.departureTime"]}
            type="text"
            id={`departure-time`}
            name={`DepartureTime`}
            value={departureTime}
            onChange={(e) =>
              dispatch(
                setFlightDetails({
                  ...flightDetails,
                  departureTime: e.target.value,
                })
              )
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mt-2">{error.departureTime}</div>
        </div>
      </div>
    </div>
  );
});
export default FlightDetails;
