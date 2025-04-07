import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setImage } from "../../redux/createPdfSlice";
import { IMAGE_PATH } from "../../constants/constants";

const ImageUploader = () => {
  const { imageName } = useAppSelector((state) => state.createPdf);

  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      dispatch(setImage(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden" // Hide the file input
      />
      {imageName ? (
        <img
          src={
            typeof imageName === "string"
              ? `${IMAGE_PATH}/${imageName}`
              : URL.createObjectURL(imageName)
          }
          alt="Uploaded"
          className="m-10 w-44 h-44 cursor-pointer"
          onClick={handleImageClick}
        />
      ) : (
        <div
          className="m-10 w-44 h-44 flex items-center justify-center bg-white border border-gray-300 cursor-pointer"
          onClick={handleImageClick}
        >
          Click to Upload
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
