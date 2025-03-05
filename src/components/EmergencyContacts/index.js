import React, { useState } from "react";

export default function EmergencyContacts() {
  const [emergencyContactKerala, setEmergencyContactKerala] = useState();
  const [emergencyNumberUK, setEmergencyNumberUK] = useState();
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
      <h1 className="mb-2">Emergency Contact in Kerala</h1>
      <input
        type="text"
        id={`emergency-contact`}
        name={`EmergencyContact`}
        value={emergencyContactKerala}
        onChange={(e) => setEmergencyContactKerala(e.target.value)}
        className="w-full px-3 py-2 mb-5 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />

      <h1 className="mb-2">Emergency Contact in UK</h1>
      <input
        type="text"
        id={`emergency-contact`}
        name={`EmergencyContact`}
        value={emergencyNumberUK}
        onChange={(e) => setEmergencyNumberUK(e.target.value)}
        className="w-full px-3 py-2 mb-10 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Submit
      </button>
    </div>
  );
}
