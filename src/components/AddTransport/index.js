import React, { useState } from "react";

export default function AddTransport() {
  const [transport, setTransport] = useState([
    {
      transfers: "",
      service: "Private Car - English Speaking Driver",
      status: "OK",
    },
  ]);

  const handleAddTransport = () => {
    setTransport([
      ...transport,
      {
        transfers: "",
        service: "",
        status: "OK",
      },
    ]);
  };

  const handleTransportInputChange = (index, field, value) => {
    const updatedTransport = transport.map((transport, i) =>
      i === index ? { ...transport, [field]: value } : transport
    );
    setTransport(updatedTransport);
  };

  const renderTransportationFields = () => {
    return transport.map((transportation, index) => (
      <div key={index} className="mb-6 border-b pb-4">
        <h2 className="text-lg font-medium mb-2">Transportation {index + 1}</h2>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`transfer-${index}`}
          >
            Transfer
          </label>
          <input
            type="text"
            id={`transfer-${index}`}
            placeholder="Eg : Kochi Airport – Hotel in Kochi "
            name={`transfer-${index}`}
            value={transportation.transfers}
            onChange={(e) =>
              handleTransportInputChange(index, "transfer", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`service-${index}`}
          >
            Service
          </label>
          <input
            type="text"
            id={`service-${index}`}
            name={`service-${index}`}
            value={transportation.service}
            onChange={(e) =>
              handleTransportInputChange(index, "service", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`status-${index}`}
          >
            Status
          </label>
          <input
            type="text"
            id={`status-${index}`}
            name={`status-${index}`}
            value={transportation.status}
            onChange={(e) =>
              handleTransportInputChange(index, "status", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mb-10">
      <h1 className="text-2xl font-bold mb-6">Transportation Details</h1>
      <form>
        {renderTransportationFields()}
        <button
          type="button"
          onClick={handleAddTransport}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 mb-4"
        >
          Add Another Transport
        </button>
      </form>
    </div>
  );
}
