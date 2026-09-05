import React, { useCallback, useEffect, useState } from "react";
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
  const numberOfDays = Number(selectedForm?.main?.numberOfDays) || 0;
  const {
    arrivalCity,
    arrivalFlightNumber,
    arrivalTime,
    departureCity,
    departureFlightNumber,
    departureTime,
  } = flightDetails || {};
  const navigate = useNavigate();

  const handleAddDays = useCallback(
    (date) => {
      const updatedDate = new Date(date);
      updatedDate.setDate(updatedDate.getDate() + numberOfDays);
      setSelectedEndDate(updatedDate);
    },
    [numberOfDays]
  );

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
    if (selectedForm) {
      handleAddDays(selectedStartDate);
    }
  }, [selectedStartDate, selectedForm, handleAddDays]);

  // Opened directly (e.g. page refresh) there is no draft to work on.
  useEffect(() => {
    if (!selectedForm) {
      navigate("/", { replace: true });
    }
  }, [selectedForm, navigate]);

  if (!selectedForm) return null;

  return (
    <div className="app-page flex justify-center items-start">
      <div className="card flex flex-col p-8 text-center overflow-hidden">
        <h2 className="page-title text-center text-2xl">
          {selectedForm.main?.title}
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
              className="text-input w-96"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-start ">
          <h1 className="text-left">
            End Date ({numberOfDays} days after start date)
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
            id="rooms"
            name="rooms"
            value={rooms}
            onChange={(e) => dispatch(setRooms(e.target.value))}
            className="text-input"
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
        <button onClick={onSavePressed} className="btn btn-primary mt-10">
          Proceed
        </button>
        <button
          onClick={() => {
            setSelectedStartDate(new Date());
            handleAddDays(new Date());
            navigate("/");
          }}
          className="btn btn-secondary mt-3"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}

export default AddDetails;
