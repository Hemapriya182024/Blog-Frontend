

import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in the header
      },
    })
    .then(response => {
      const postInfo = response.data;
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
    })
    .catch(error => console.error("Error fetching post:", error));
  }, [id, token]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('id', id);
    if (files?.[0]) {
      data.append('file', files[0]);
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/post',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true, 
        }
      );
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Edit Post</h2>

        <form onSubmit={updatePost} className="space-y-4">
          {/* Title Input */}
          <input 
            type="text"
            placeholder="Title"
            value={title}
            onChange={ev => setTitle(ev.target.value)} 
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Summary Input */}
          <input 
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={ev => setSummary(ev.target.value)} 
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* File Input */}
          <input 
            type="file"
            onChange={ev => setFiles(ev.target.files)} 
            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Editor for Content */}
          <Editor onChange={setContent} value={content} />

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}
