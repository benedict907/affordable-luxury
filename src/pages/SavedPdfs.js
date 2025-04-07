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
    <div className="flex justify-center items-center h-full">
      <div className="flex items-center flex-col p-5 border w-1/2 pb-10 border-[#ccc] rounded-lg text-center shadow-lg mt-10">
        <h2 className="text-center text-2xl text-black-2 mb-5 font-bold">
          Saved Files
        </h2>
        {pdfs
          ?.filter(
            (item) =>
              item?.confirmationDetails !== undefined &&
              item?.confirmationDetails !== null
          )
          .map((formList, index) => (
            <div
              key={formList.title}
              className="flex justify-between items-center w-3/4 mb-5"
            >
              <div
                onClick={() => {
                  navigate("/pdf-view", {
                    state: {
                      confirmationNumber:
                        formList.confirmationDetails.confirmationNumber,
                      passengerList: formList.confirmationDetails.passengerList,
                      selectedForm: formList,
                      selectedStartDate:
                        formList.confirmationDetails.selectedStartDate,
                      selectedEndDate:
                        formList.confirmationDetails.selectedEndDate,
                    },
                  });
                }}
                className="p-5 border w-full border-[#ccc] rounded-lg text-center shadow-lg hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
              >
                <h3>{formList.main.title}</h3>
              </div>

              <button
                onClick={() => {
                  setSelectedItem(formList._id);
                  setIsDialogOpen(true);
                }}
                className="justify-center justify-self-center ms-5 active:bg-orange-500 bg-orange-400 p-2 rounded-lg flex items-center"
              >
                <MdDelete color="white" className="w-5 h-5 active:opacity-50" />
              </button>
            </div>
          ))}
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
