
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState(null); // State for user details
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch user profile
  async function fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('https://blog-backend-c6mq.onrender.com/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    } else {
      setLoading(false); // No token, no user data
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile on component mount

  async function createNewPost(ev) {
    ev.preventDefault();

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
      const response = await axios.post('https://blog-backend-c6mq.onrender.com/post', data, {
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

  function handleLogout() {
    localStorage.removeItem('token'); // Clear the token from localStorage
    setUser(null); // Clear user state
    setRedirect(true); // Redirect to login or home page
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (loading) {
    return <div>Loading...</div>; // Optionally show loading state
  }

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form onSubmit={createNewPost} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Back Button */}
        <button 
          onClick={() => setRedirect(true)} 
          className="absolute top-4 left-4 text-white text-sm font-semibold hover:text-blue-500"
        >
          &lt; Back to Home
        </button>

        <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Create New Post</h1>
        
        {/* Welcome Message with User's Name */}
        {user && (
          <p className="text-center tex-lg text-blue-500 mb-4">Welcome, {user.username}!</p>
        )}
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Editor value={content} onChange={setContent} />

        <button
          type="submit"
          className="w-full p-3 mt-5 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Post
        </button>
      </form>

      {/* Logout Button */}
      {user && (
        <div className="mt-6 text-center text-white">
          <button
            onClick={handleLogout}
            className="mt-3 p-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
