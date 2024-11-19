
import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Registration handler
  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      console.log(response.data);
      alert('Registered successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during registration');
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm" onSubmit={register}>
        <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">Register</h1>
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
          Register
        </button>

        <div className="mt-4 text-center">
          <span className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-300 transition duration-300">
              Click here to login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
