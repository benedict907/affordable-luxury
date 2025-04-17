import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deletePdf, getPdfs } from "../redux/clientSlice";
import { MdDelete } from "react-icons/md";
import ConfirmDelete from "../components/DeletePopup";

function SavedPdfs() {
  const dispatch = useAppDispatch();
  const { pdfs, deleteSuccess } = useAppSelector((state) => state.client);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getPdfs());
    }
  }, [deleteSuccess]);

  const onDeletePressed = () => {
    dispatch(deletePdf(selectedItem));
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-center text-2xl text-black-2 mb-5 font-bold">
        Saved Files
      </h2>
      <div className="flex-col p-5 w-full pb-10">
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search files..."
            className="mb-5 p-2 border w-60  border-[#ccc] rounded-lg shadow-sm"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setSearchTerm(searchTerm);
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          {pdfs
            ?.filter(
              (item) =>
                item?.confirmationDetails !== undefined &&
                item?.confirmationDetails !== null &&
                item?.confirmationDetails?.confirmationNumber
                  .toLowerCase()
                  .includes(searchTerm)
            )
            .map((formList, index) => (
              <div
                key={formList.title}
                className="flex justify-between items-center w-3/4 mb-2"
              >
                <div
                  onClick={() => {
                    navigate("/pdf-view", {
                      state: {
                        confirmationNumber:
                          formList.confirmationDetails.confirmationNumber,
                        passengerList:
                          formList.confirmationDetails.passengerList,
                        selectedForm: formList,
                        selectedStartDate:
                          formList.confirmationDetails.selectedStartDate,
                        flights: formList.flights,
                        selectedEndDate:
                          formList.confirmationDetails.selectedEndDate,
                      },
                    });
                  }}
                  className="p-2 border w-full border-[#ccc] rounded-lg text-center shadow-lg hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
                >
                  <h3>{formList.confirmationDetails.confirmationNumber}</h3>
                </div>

                <button
                  onClick={() => {
                    setSelectedItem(formList._id);
                    setIsDialogOpen(true);
                  }}
                  className="justify-center justify-self-center ms-5 active:bg-orange-500 bg-orange-400 p-2 rounded-lg flex items-center"
                >
                  <MdDelete
                    color="white"
                    className="w-5 h-5 active:opacity-50"
                  />
                </button>
              </div>
            ))}
        </div>
      </div>

      <ConfirmDelete
        isOpen={isDialogOpen}
        onConfirm={onDeletePressed}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default SavedPdfs;
