import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deletePdf, getPdfs } from "../redux/clientSlice";
import { MdEdit } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { logoutSuccess } from "../redux/authSlice";
import ConfirmDelete from "../components/DeletePopup";

function HomePage() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { pdfs, deleteSuccess } = useAppSelector((state) => state.client);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPdfs());
    }
  }, [isLoggedIn]);

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
          Choose your file
        </h2>
        {pdfs
          ?.map((item) => item.main)
          .map((formList, index) => (
            <div
              key={formList.title}
              className="flex justify-between items-center w-3/4 mb-5"
            >
              <div
                onClick={() =>
                  navigate("/add-details", {
                    state: {
                      selectedForm: pdfs[index],
                    },
                  })
                }
                className="p-5 border w-full border-[#ccc] rounded-lg text-center shadow-lg hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
              >
                <h3>{formList.title}</h3>
              </div>

              <button
                onClick={() => {
                  navigate("/create-pdf", {
                    state: pdfs[index],
                  });
                }}
                className="justify-center justify-self-center ms-10 active:bg-orange-500 bg-orange-400 p-2 rounded-lg flex items-center"
              >
                <MdEdit color="white" className="w-5 h-5 active:opacity-50" />
              </button>
              <button
                onClick={() => {
                  setSelectedItem(pdfs[index]._id);
                  setIsDialogOpen(true);
                }}
                className="justify-center justify-self-center ms-5 active:bg-orange-500 bg-orange-400 p-2 rounded-lg flex items-center"
              >
                <MdDelete color="white" className="w-5 h-5 active:opacity-50" />
              </button>
            </div>
          ))}
        <button
          onClick={() => {
            navigate("/create-pdf");
          }}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Create PDF
        </button>
      </div>
      <button
        onClick={() => {
          dispatch(logoutSuccess());
        }}
        className="absolute right-10 top-10 p-5  border-[#ccc] rounded-lg text-center shadow-lg  text-white"
      >
        <SlLogout className="w-10 h-10" color="black" />
      </button>
      <ConfirmDelete
        isOpen={isDialogOpen}
        onConfirm={onDeletePressed}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default HomePage;
