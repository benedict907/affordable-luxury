import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setEmergencyContacts } from "../../redux/createPdfSlice";

export default function EmergencyContacts() {
  // const [emergencyContacts, setEmergencyContacts] = useState({
  //   emergencyContactKerala: "",
  //   emergencyNumberUK: "",
  // });
  const { emergencyContacts } = useAppSelector((state) => state.createPdf);
  const dispatch = useAppDispatch();
  const { emergencyContactKerala, emergencyNumberUK } = emergencyContacts || {};

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="mb-2">Emergency Contact in Kerala</h1>
      <input
        type="text"
        id={`emergency-contact`}
        name={`EmergencyContact`}
        value={emergencyContactKerala}
        onChange={(e) =>
          dispatch(
            setEmergencyContacts({
              ...emergencyContacts,
              emergencyContactKerala: e.target.value,
            })
          )
        }
        className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />

      <h1 className="mb-2">Emergency Contact in UK</h1>
      <input
        type="text"
        id={`emergency-contact`}
        name={`EmergencyContact`}
        value={emergencyNumberUK}
        onChange={(e) =>
          dispatch(
            setEmergencyContacts({
              ...emergencyContacts,
              emergencyNumberUK: e.target.value,
            })
          )
        }
        className="w-full px-3 py-2 mb-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
}
