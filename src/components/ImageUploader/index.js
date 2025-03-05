import React, { useRef, useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
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
      {image ? (
        <img
          src={image}
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
