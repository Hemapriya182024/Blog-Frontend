

import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({ value, onChange }) {
  const quillRef = useRef(null); // Ref to the ReactQuill editor

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="editor-container p-5 bg-gray-100 rounded-lg shadow-lg">
      <ReactQuill
        ref={quillRef} // Attach ref here
        value={value}
        theme="snow"
        onChange={onChange}
        modules={modules}
        placeholder="Write your content here..."
        className="w-full border border-gray-300 rounded-md"
      />
    </div>
  );
}
