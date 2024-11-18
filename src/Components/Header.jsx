import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import { userContext } from '../Context/UserContext';

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext); // Use context here

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserInfo(null); // Clear userInfo if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data.user.username);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
        setUserInfo(null);
      }
    };

    fetchProfile(); // Call the fetchProfile function on component mount
  }, [setUserInfo]); // Dependency array includes setUserInfo

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUserInfo(null); // Clear the userInfo from context after logout
  };

  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      <nav>
        {userInfo ? (
          <>
            <span>Welcome, {userInfo}</span>
            <Link to="/create">Create new post</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
