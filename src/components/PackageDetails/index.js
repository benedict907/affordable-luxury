import React, { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPackageData } from "../../redux/createPdfSlice";

const PackageDetails = forwardRef((props, ref) => {
  const dispatch = useAppDispatch();
  const packageData = useAppSelector((state) => state.createPdf.main);
  const error = useAppSelector((state) => state.createPdf.errors.main);

  const { title, numberOfDays, emergencyContact, emergencyNumber } =
    packageData;

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg my-10">
      <h1 className="text-2xl font-bold mb-6">Package Details</h1>
      <h1 className="mb-2">Enter PDF Heading *</h1>
      <input
        ref={ref["main.title"]}
        type="text"
        id={`title`}
        placeholder="Eg : Enchanting Kerala 15 nights & 16 Days"
        name={`Heading`}
        value={title}
        onChange={(e) =>
          dispatch(setPackageData({ ...packageData, title: e.target.value }))
        }
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div className="text-red-500 mt-2">{error.title}</div>
      <h1 className="mb-2 mt-5">Number of days *</h1>
      <input
        ref={ref["main.numberOfDays"]}
        id={`numberOfDays`}
        name={`EmergencyContact`}
        value={numberOfDays}
        onChange={(e) => {
          dispatch(
            setPackageData({
              ...packageData,
              numberOfDays: e.target.value,
            })
          );
          // handleAddDays(selectedStartDate, e.target.value);
        }}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none  focus:ring-blue-300"
      />
      <div className="text-red-500 mt-2">{error.numberOfDays}</div>
      <h1 className="mb-2 my-5">Emergency Contact Name</h1>
      <input
        type="text"
        id={`emergency-contact`}
        name={`EmergencyContact`}
        value={emergencyContact}
        onChange={(e) =>
          dispatch(
            setPackageData({ ...packageData, emergencyContact: e.target.value })
          )
        }
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      <h1 className="mb-2 my-5">Emergency Contact Number</h1>
      <input
        type="text"
        id={`emergency-contact-number`}
        placeholder=""
        name={`Number`}
        value={emergencyNumber}
        onChange={(e) => {
          dispatch(
            setPackageData({ ...packageData, emergencyNumber: e.target.value })
          );
        }}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
      {/* <button
        type="button"
        onClick={() => saveMain(packageData)}
        className="w-full bg-blue-500 mt-5 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Save Package Details
      </button> */}
    </div>
  );
});
export default PackageDetails;
