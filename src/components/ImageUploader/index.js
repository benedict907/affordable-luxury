import React, { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setImage } from "../../redux/createPdfSlice";
import { IMAGE_PATH } from "../../constants/constants";

const ImageUploader = () => {
  const { imageName } = useAppSelector((state) => state.createPdf);

  const dispatch = useAppDispatch();
  const fileInputRef = useRef(null);

  // imageName is either a stored filename (string) or a freshly selected File.
  const previewUrl = useMemo(() => {
    if (!imageName) return null;
    return typeof imageName === "string"
      ? `${IMAGE_PATH}/${imageName}`
      : URL.createObjectURL(imageName);
  }, [imageName]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(setImage(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Uploaded logo — click to replace"
          className="m-10 w-44 h-44 cursor-pointer"
          onClick={handleImageClick}
        />
      ) : (
        <button
          type="button"
          className="tile m-10 flex h-44 w-44 items-center justify-center text-sm text-ink-soft"
          onClick={handleImageClick}
        >
          Click to Upload
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
