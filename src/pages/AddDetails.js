import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateToDDMMYYYY } from "../helper";
import AddPassenger from "../components/AddPassenger";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setFlightDetails, setRooms } from "../redux/createPdfSlice";

function AddDetails() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [passengerList, setPassengerList] = useState([]);
  const flightDetails = useAppSelector((state) => state.createPdf.flights);
  const error = useAppSelector((state) => state.createPdf.errors.flights);
  const rooms = useAppSelector((state) => state.createPdf.rooms);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { selectedForm } = location.state || {};
  const {
    arrivalCity,
    arrivalFlightNumber,
    arrivalTime,
    departureCity,
    departureFlightNumber,
    departureTime,
  } = flightDetails || {};
  const navigate = useNavigate();

  const handleAddDays = (date) => {
    const updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + selectedForm.main.numberOfDays);
    setSelectedEndDate(updatedDate);
  };
  //adding this to clear the flight details when the component mounts so that user can see empty text input
  //not clearing the DB because deploying the backend is complicated.
  // useEffect(() => {
  //   dispatch(
  //     setFlightDetails({
  //       arrivalCity: "",
  //       arrivalFlightNumber: "",
  //       arrivalTime: "",
  //       departureCity: "",
  //       departureFlightNumber: "",
  //       departureTime: "",
  //     })
  //   );
  // }, []);
  const onSavePressed = () => {
    if (confirmationNumber.trim() === "") {
      alert("Please enter confirmation number");
      return;
    }
    if (passengerList.length === 0) {
      alert("Please enter passenger name");
      return;
    }
    navigate("/pdf-view", {
      state: {
        confirmationNumber,
        passengerList,
        selectedForm,
        flights: flightDetails,
        selectedStartDate,
        selectedEndDate,
      },
    });
  };

  useEffect(() => {
    if (selectedForm !== null) {
      handleAddDays(selectedStartDate);
    }
  }, [selectedStartDate, selectedForm]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col p-5 border border-[#ccc] rounded-lg text-center shadow-lg mt-10 overflow-hidden">
        <h2 className="text-center text-2xl text-black-2 font-bold">
          {selectedForm.title}
        </h2>
        <div className="mt-10 flex flex-col">
          <label className="text-left">Confirmation Number</label>
          <input
            value={confirmationNumber}
            className="text-input capitalize"
            onChange={(e) => {
              setConfirmationNumber(e.target.value.toUpperCase());
            }}
            type="text"
          />
        </div>
        <AddPassenger
          passengerList={passengerList}
          setPassengerList={setPassengerList}
        />
        <div className="mt-10 flex flex-col justify-start ">
          <h1 className="text-left">Select Start Date</h1>
          <div className="flex justify-start">
            <DatePicker
              selected={selectedStartDate}
              onChange={(date) => {
                setSelectedStartDate(date);
                handleAddDays(date);
              }}
              dateFormat="dd/MM/yyyy"
              className="border border-gray-300 p-2 w-96 rounded-lg"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-start ">
          <h1 className="text-left">
            End Date ({selectedForm.main.numberOfDays} days after start date)
          </h1>
          <input
            value={formatDateToDDMMYYYY(selectedEndDate)}
            className="text-input"
            disabled
            type="text"
          />
        </div>
        <div className="my-4">
          <h1 className="mb-2 text-start">Rooms</h1>
          <input
            id={`rooms}`}
            name={`rooms}`}
            value={rooms}
            onChange={(e) => dispatch(setRooms(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="">
          {/* <h1 className="text-2xl text-start font-bold mb-6">Flight Details</h1> */}
          <div className="flex-col">
            <div className="mt-5 flex flex-col justify-start">
              <h1 className="mb-2 text-start">Arrival City</h1>
              <input
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
                className="text-input"
              />
              <div className="text-red-500 mb-5">{error.arrivalCity}</div>
            </div>

            <div className="mt-5 flex flex-col justify-start">
              <h1 className="mb-2 text-start">Arrival Flight Number</h1>
              <input
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
                className="text-input"
              />
              <div className="text-red-500 mb-5">
                {error.arrivalFlightNumber}
              </div>
            </div>

            <div className="mt-5 flex flex-col justify-start">
              <h1 className="mb-2 text-start">Arrival Time</h1>
              <input
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
                className="text-input"
              />
              <div className="text-red-500 mb-5">{error.arrivalTime}</div>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-start">
            <h1 className="mb-2 text-start">Departure City</h1>
            <input
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
              className="text-input"
            />
            <div className="text-red-500 mb-5 mt-2">{error.departureCity}</div>
          </div>

          <div className="mt-5 flex flex-col justify-start">
            <h1 className="mb-2 text-start">Departure Flight Number</h1>
            <input
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
              className="text-input"
            />
            <div className="text-red-500 mt-2">
              {error.departureFlightNumber}
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-start">
            <h1 className="mb-2 text-start">Departure Time</h1>
            <input
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
              className="text-input"
            />
            <div className="text-red-500 mt-2">{error.departureTime}</div>
          </div>
        </div>
        <button
          onClick={onSavePressed}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-10"
        >
          Proceed
        </button>
        <button
          onClick={() => {
            setSelectedStartDate(new Date());
            handleAddDays(new Date());
            navigate("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-5"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default AddDetails;
