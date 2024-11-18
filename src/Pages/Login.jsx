import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../index.css';
import {Navigate} from 'react-router-dom'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[redirect,setredirect]=useState(false);
  

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      
      // Extract token from response headers or body
      const token = response.data.token || response.headers['authorization']?.split(' ')[1];
      
      if (token) {
        localStorage.setItem('token', token); // Store the token
        console.log('Token saved:', token);
        setredirect(true)
      } else {
        console.error('Token not found in response.');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data?.message || error.message);
      alert('wrong credentials')
    }
  }
  if(redirect)
  {
    return <Navigate to={'/'} />
  }


  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
