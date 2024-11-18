import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null); 
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    // Check if the token is present
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return; // Optionally handle the case where token is missing (e.g., redirect to login)
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files) {
      data.set('file', files[0]); // Ensure correct field name, only add file if it's present
    }

    try {
      const response = await axios.post('http://localhost:5000/post', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Send credentials with the request
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("There was an error creating the post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
      />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)} // Handling file selection
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }}>Create post</button>
    </form>
  );
}
