import React, { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { deleteTransport, setTransport } from "../../redux/createPdfSlice";
import { MdDelete } from "react-icons/md";

const AddTransport = forwardRef((props, ref) => {
  const transport = useAppSelector((state) => state.createPdf.transportation);
  const error = useAppSelector(
    (state) => state.createPdf.errors.transportation
  );

  const dispatch = useAppDispatch();
  const handleAddTransport = () => {
    dispatch(
      setTransport([
        ...transport,
        {
          transfers: "",
          service: "Private Car - English Speaking Driver",
          status: "OK",
        },
      ])
    );
  };
  const handleDeleteTransport = (index) => {
    dispatch(deleteTransport(index));
  };

  const handleTransportInputChange = (index, field, value) => {
    const updatedTransport = transport.map((transport, i) =>
      i === index ? { ...transport, [field]: value } : transport
    );
    dispatch(setTransport(updatedTransport));
  };

  const renderTransportationFields = () => {
    return transport.map((transportation, index) => (
      <div key={index} className="mb-6 border-b pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium mb-2">
            Transportation {index + 1}
          </h2>
          {index > 0 ? (
            <MdDelete
              onClick={() => {
                handleDeleteTransport(index);
              }}
              className="w-10 h-10 active:opacity-50"
            />
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`transfer-${index}`}
          >
            Transfer*
          </label>
          <input
            ref={ref["transportation.transfers"]}
            type="text"
            id={`transfer-${index}`}
            placeholder="Eg : Kochi Airport – Hotel in Kochi "
            name={`transfer-${index}`}
            value={transportation.transfers}
            onChange={(e) =>
              handleTransportInputChange(index, "transfers", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5">{error[index]?.transfers}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`service-${index}`}
          >
            Service*
          </label>
          <input
            ref={ref["transportation.service"]}
            type="text"
            id={`service-${index}`}
            name={`service-${index}`}
            value={transportation.service}
            onChange={(e) =>
              handleTransportInputChange(index, "service", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5">{error[index]?.service}</div>
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor={`status-${index}`}
          >
            Status*
          </label>
          <input
            ref={ref["transportation.status"]}
            type="text"
            id={`status-${index}`}
            name={`status-${index}`}
            value={transportation.status}
            onChange={(e) =>
              handleTransportInputChange(index, "status", e.target.value)
            }
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="text-red-500 mb-5">{error[index]?.status}</div>
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
});
export default AddTransport;
