import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

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
      console.log(response.data)
      alert('Registered successfully')
     
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during registration');
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
