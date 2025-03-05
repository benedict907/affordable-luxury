import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateToDDMMYYYY } from "../../helper";

export default function PackageDetails() {
  const [heading, setHeading] = useState();
  const [emergencyContact, setEmergencyContact] = useState();
  const [emergencyNumber, setEmergencyNumber] = useState();
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleAddDays = (date) => {
    const updatedDate = new Date(date);
    updatedDate.setDate(updatedDate.getDate() + numberOfDays);
    setSelectedEndDate(updatedDate);
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg my-10">
      <h1 className="text-2xl font-bold mb-6">Package Details</h1>
      <h1 className="mb-2">Enter PDF Heading</h1>
      <input
        type="text"
        id={`heading`}
        placeholder="Eg : Enchanting Kerala 15 nights & 16 Days"
        name={`Heading`}
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        className="w-full px-3 py-2 mb-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      <h1 className="mb-2">Emergency Contact Name</h1>
      <input
        type="text"
        id={`emergency-contact`}
        name={`EmergencyContact`}
        value={emergencyContact}
        onChange={(e) => setEmergencyContact(e.target.value)}
        className="w-full px-3 py-2 mb-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      <h1 className="mb-2">Emergency Contact Number</h1>
      <input
        type="text"
        id={`emergency-contact-number`}
        placeholder=""
        name={`Number`}
        value={emergencyNumber}
        onChange={(e) => setEmergencyNumber(e.target.value)}
        className="w-full px-3 py-2 mb-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
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
      <h1 className="mb-2">Number of days</h1>
      <input
        type="number"
        id={`days`}
        placeholder=""
        name={`numberOfDays`}
        value={numberOfDays}
        onChange={(e) => setNumberOfDays(e.target.value)}
        className="w-full px-3 py-2 mb-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      {numberOfDays > 0 ? (
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
      ) : null}
    </div>
  );
}
