

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('');

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-backend-c6mq.onrender.com/login', { username, password });

      // Extract token from response headers or body
      const token = response.data.token || response.headers['authorization']?.split(' ')[1];

      if (token) {
        localStorage.setItem('token', token); // Store the token
        console.log('Token saved:', token);
        setRedirect('/create');  // Redirect to /create on success
      } else {
        console.error('Token not found in response.');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      alert('Wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;  // Redirect to the value in the 'redirect' state
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm" onSubmit={login}>
        <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-300 transition duration-300">
              Click here to register
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
