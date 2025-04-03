import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const RichTextEditor = ({ text, onChangeText }) => {
  const quillRef = useRef(null);
  useEffect(() => {
    const editor = quillRef.current.getEditor(); // Access the Quill editor instance
    editor.format("list", "bullet"); // Enable bullet mode by default
  }, []);
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
        ref={quillRef}
        value={text}
        onChange={onChangeText}
        modules={modules}
        theme="snow"
        placeholder="Start typing..."
      />
      {/* <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div> */}
    </div>
  );
};

export default RichTextEditor;
