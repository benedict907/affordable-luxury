import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateToDDMMYYYY } from "../helper";
import AddPassenger from "../components/AddPassenger";
import { useLocation, useNavigate } from "react-router-dom";

function AddDetails() {
  //   const [selectedForm, setSelectedForm] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [passengerList, setPassengerList] = useState([]);

  const location = useLocation();
  const { selectedForm } = location.state || {};

  const navigate = useNavigate();

  const handleAddDays = (date) => {
    const updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + selectedForm.main.numberOfDays);
    setSelectedEndDate(updatedDate);
  };

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
