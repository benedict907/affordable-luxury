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
    return transport?.map((transportation, index) => (
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
            className="text-input"
          />
          <div className="field-error mb-5">{error[index]?.transfers}</div>
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
            className="text-input"
          />
          <div className="field-error mb-5">{error[index]?.service}</div>
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
            className="text-input"
          />
          <div className="field-error mb-5">{error[index]?.status}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="card w-full max-w-4xl p-6 sm:p-8 mb-10">
      <h1 className="text-2xl font-bold mb-6">Transportation Details</h1>
      <form>
        {renderTransportationFields()}
        <button
          type="button"
          onClick={handleAddTransport}
          className="btn btn-secondary w-full mb-4"
        >
          Add Another Transport
        </button>
      </form>
    </div>
  );
});
export default AddTransport;
