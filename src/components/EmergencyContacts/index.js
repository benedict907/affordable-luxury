import React from "react";
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
    <div className="card w-full max-w-4xl p-6 sm:p-8">
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
        className="text-input mb-5"
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
        className="text-input mb-10"
      />
    </div>
  );
}
