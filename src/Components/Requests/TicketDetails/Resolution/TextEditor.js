import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Import styles

export default function RichTextEditor() {
  const [value, setValue] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];
  console.log('HTML editor___',value)

  return (
    <div className="p-4">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={{ height: "200px", marginBottom: "40px",marginTop:"20px" }}
      />
      <div className="mt-4 border p-2 rounded bg-gray-50">
        {/* <h3 className="font-medium">Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: value }} /> */}
      </div>
    </div>
  );
}
