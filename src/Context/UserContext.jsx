import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Function to fetch user info based on token
  const fetchUserInfo = (token) => {
    axios
      .get('https://blog-backend-c6mq.onrender.com/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserInfo(response.data.user);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
        setUserInfo(null); // Clear user info in case of error
      });
  };

  // Check if token exists in localStorage and set userInfo on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token); // Fetch user data if token exists
    }

    // Event listener to detect changes in localStorage
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchUserInfo(token); // Fetch user data if token exists after storage change
      } else {
        setUserInfo(null); // Clear user info if token is removed
      }
    };

    window.addEventListener('storage', handleStorageChange); // Listen for localStorage changes

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Cleanup listener on component unmount
    };
  }, []); // This runs once when the component mounts

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </userContext.Provider>
  );
};
