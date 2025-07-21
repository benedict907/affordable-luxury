import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const RichTextEditor = ({ text, onChangeText }) => {
  // Toolbar options for formatting
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }], // Enable bullet and numbered lists
      ["link", "image"],
      ["clean"], // Remove formatting
    ],
  };

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={onChangeText}
        modules={modules}
        theme="snow"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default RichTextEditor;
