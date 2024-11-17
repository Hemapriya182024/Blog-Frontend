import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUsername(null); // Clear username if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        setUsername(response.data.user.username); // Update username state
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
        setUsername(null); // Clear username on error
      }
    };

    fetchProfile(); // Call the fetchProfile function on component mount
  }, []); // Empty dependency array to run only on mount

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUsername(null); // Clear the username from state after logout
  };

  return (
    <div>
      <header>
        <Link to="/" className="logo">
          My Blog
        </Link>
        <nav>
          {username ? (
            <>
              <span>Welcome, {username}</span>
              <Link to="/create">Create new post</Link>
              {/* Logout button */}
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
    </div>
  );
};

export default Header;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import '../index.css';

// const Header = () => {
//   const [username, setUsername] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return; // If no token, skip the request

//       try {
//         const response = await axios.get('http://localhost:5000/profile', {
//           headers: {
//             Authorization: Bearer ${token}, // Send the token in the Authorization header
//           },
//         });
//         setUsername(response.data.user.username); // Update the username state
//       } catch (error) {
//         console.error(
//           'Error fetching profile:',
//           error.response?.data?.message || error.message
//         );
//         setUsername(null); // Ensure username is cleared on error
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div>
//       <header>
//         <Link to="/" className="logo">
//           My Blog
//         </Link>
//         <nav>
//           {username ? (
//             <>
//               <span>Welcome, {username}</span>
//               <Link to="/create">Create new post</Link>
//             </>
//           ) : (
//             <>
//               <Link to="/login">Login</Link>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Header; 