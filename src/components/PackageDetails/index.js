import React, { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setPackageData } from "../../redux/createPdfSlice";

const PackageDetails = forwardRef((props, ref) => {
  const dispatch = useAppDispatch();
  const packageData = useAppSelector((state) => state.createPdf.main);
  const error = useAppSelector((state) => state.createPdf.errors.main);

  const { title, numberOfDays, emergencyContact, emergencyNumber } =
    packageData || {};

  return (
    <div className="card w-full max-w-4xl p-6 sm:p-8 my-10">
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
        className="text-input"
      />
      <div className="field-error mt-2">{error.title}</div>
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
        className="text-input"
      />
      <div className="field-error mt-2">{error.numberOfDays}</div>
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
        className="text-input"
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
        className="text-input"
      />
    </div>
  );
});
export default PackageDetails;
