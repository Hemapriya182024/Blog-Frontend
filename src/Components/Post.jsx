// import React from 'react'
// import '../index.css';

// const Post = () => {
//   return (
//     <div>
//           <div className='post'>
//         <div className='image'>
//         <img src='https://techcrunch.com/wp-content/uploads/2024/11/GettyImages-2032109653-e.jpg?resize=1200,800' />
//         </div>
      
//         <div className="texts">
//           <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. c tempora quia.</h2>
//           <p className="info">
//             <a href="" className="author" > Hema</a>
//             <time>2023-9-01 16:45</time>
//           </p>
//           <p className='summary'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia velit nobis eius, .</p>
//         </div>


//       </div>
     
      
//     </div>
//   )
// }

// export default Post

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]); // State to store all posts
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch all posts using Axios
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts'); // Replace with your backend URL
        console.log(response.data)
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="image">
            <Link to={`/post/${post._id}`} >
            <img src={`http://localhost:5000/${post.cover}`} alt={post.title} />
            </Link>
          </div>

          <div className="texts">
            <h2>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="info">
              <a href="" className="author">
                {post.author?.username || 'Unknown Author'}
              </a>
              <time>{new Date(post.createdAt).toLocaleString()}</time>
            </p>
            <p className="summary">{post.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

