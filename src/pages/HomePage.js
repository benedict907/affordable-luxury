import React, { useEffect, useState } from "react";
import { formLists } from "../constants/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateToDDMMYYYY } from "../helper";
import AddPassenger from "../components/AddPassenger";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [passengerList, setPassengerList] = useState([]);

  const navigate = useNavigate();
  const handleAddDays = (date) => {
    const updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + selectedForm.days);
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
      {selectedForm === null ? (
        <div className="flex flex-col p-5 border border-[#ccc] rounded-lg text-center shadow-lg mt-10">
          <h2 className="text-center text-2xl text-black-2 font-bold">
            Choose your file
          </h2>
          {formLists.map((formList) => (
            <div
              onClick={() => setSelectedForm(formList)}
              key={formList.title}
              className="p-5 border border-[#ccc] rounded-lg text-center shadow-lg mt-10 hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
            >
              <h3>{formList.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col p-5 border border-[#ccc] rounded-lg text-center shadow-lg mt-10 overflow-hidden">
          <h2 className="text-center text-2xl text-black-2 font-bold">
            {selectedForm.title}
          </h2>
          <div className="mt-10 flex flex-col">
            <label className="text-left">Confirmation Number</label>
            <input
              className="text-input"
              onChange={(e) => {
                setConfirmationNumber(e.target.value);
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
              End Date ({selectedForm.days} days after start date)
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
              setSelectedForm(null);
              setSelectedStartDate(new Date());
              handleAddDays(new Date());
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-5"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
