import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Context/UserContext';

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext);

  const handleLogout = () => {
    // Clear the user info and remove token from localStorage
    localStorage.removeItem('token');
    setUserInfo(null);  // Clear user info on logout
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400">
        My Blog
      </Link>
      <nav className="flex items-center space-x-6">
        {userInfo ? (
          <>
            <span className="text-lg">Welcome, <span className="font-semibold">{userInfo.username}</span></span>
            <Link to="/create" className="text-lg text-blue-500 hover:text-blue-400">Create new post</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-lg text-blue-500 hover:text-blue-400">Login</Link>
            <Link to="/register" className="text-lg text-blue-500 hover:text-blue-400">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
