import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { deletePdf, getPdfs } from "../redux/clientSlice";
import { MdEdit } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { logoutSuccess } from "../redux/authSlice";
import ConfirmDelete from "../components/DeletePopup";
import { FaRegCopy } from "react-icons/fa";
import { savePdf } from "../redux/createPdfSlice";
import ConfirmCopy from "../components/ConfirmCopy";

function HomePage() {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { pdfs, deleteSuccess } = useAppSelector((state) => state.client);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
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

  const copyPdf = (formList) => {
    const {
      imageName,
      main,
      hotelItinerary,
      flights,
      transportation,
      emergencyContacts,
      groundItinerary,
      importantPoints,
      travelTips,
      customBulletPoint,
    } = formList;

    let updatedMain = structuredClone(main);
    updatedMain.title = `Copy of ${main.title}`;
    const formData = new FormData();

    formData.append("main", JSON.stringify(updatedMain));

    formData.append("flights", JSON.stringify(flights));
    formData.append("importantPoints", JSON.stringify(importantPoints));
    formData.append("travelTips", JSON.stringify(travelTips));
    formData.append("customBulletPoint", JSON.stringify(customBulletPoint));
    formData.append("emergencyContacts", JSON.stringify(emergencyContacts));
    formData.append("image", imageName);

    // Append arrays: each element as separate entry
    hotelItinerary.forEach((hotelItinerary, index) =>
      formData.append(`hotelItinerary`, JSON.stringify(hotelItinerary))
    );
    groundItinerary.forEach((groundItinerary, index) =>
      formData.append(`groundItinerary`, JSON.stringify(groundItinerary))
    );
    transportation.forEach((transportation, index) =>
      formData.append(`transportation`, JSON.stringify(transportation))
    );
    dispatch(savePdf(formData));

    setTimeout(() => {
      dispatch(getPdfs());
    }, 500);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex items-center flex-col p-5 border w-1/2 pb-10 border-[#ccc] rounded-lg text-center shadow-lg mt-10">
        <h2 className="text-center text-2xl text-black-2 mb-5 font-bold">
          Choose your file
        </h2>
        {pdfs
          ?.filter(
            (item) =>
              item?.confirmationDetails === undefined ||
              item?.confirmationDetails === null
          )
          .map((formList) => (
            <div
              key={formList.main.title}
              className="flex justify-between items-center w-3/4 mb-5"
            >
              <div
                onClick={() =>
                  navigate("/add-details", {
                    state: {
                      selectedForm: formList,
                    },
                  })
                }
                className="p-5 border w-full border-[#ccc] rounded-lg text-center shadow-lg hover:bg-gray-100 active:bg-gray-200 cursor-pointer"
              >
                <h3>{formList.main.title}</h3>
              </div>

              <button
                onClick={() => {
                  setSelectedItem(formList);
                  setIsCopyDialogOpen(true);
                }}
                className="justify-center justify-self-center ms-10 active:bg-orange-500 bg-orange-400 p-2 rounded-lg flex items-center"
              >
                <FaRegCopy
                  color="white"
                  className="w-5 h-5 active:opacity-50"
                />
              </button>
              <button
                onClick={() => {
                  navigate("/create-pdf", {
                    state: formList,
                  });
                }}
                className="justify-center justify-self-center ms-5 active:bg-orange-500 bg-orange-400 p-2 rounded-lg flex items-center"
              >
                <MdEdit color="white" className="w-5 h-5 active:opacity-50" />
              </button>
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
        <button
          onClick={() => {
            navigate("/create-pdf");
          }}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Create PDF
        </button>
        <button
          onClick={() => {
            navigate("/view-saved");
          }}
          className="bg-blue-500 text-white p-2 rounded-lg mt-10"
        >
          View Saved Pdfs
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

      <ConfirmCopy
        isOpen={isCopyDialogOpen}
        onConfirm={() => {
          copyPdf(selectedItem);
          setIsCopyDialogOpen(false);
        }}
        onCancel={() => setIsCopyDialogOpen(false)}
      />
    </div>
  );
}

export default HomePage;
