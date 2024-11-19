
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
        const response = await axios.get('https://blog-backend-c6mq.onrender.com/posts'); 
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
    return <div className="text-center text-white">Loading...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-white">No posts found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-gray-900 ">
      {posts.map((post) => (
        <div
          className="post bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-gray-700"
          key={post._id}
        >
          <div className="image mb-4">
            <Link to={`/post/${post._id}`}>
              <img
                src={`https://blog-backend-c6mq.onrender.com/${post.cover}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded-md transform hover:scale-110 transition-transform duration-500"
              />
            </Link>
          </div>

          <div className="texts">
            <h2 className="text-2xl font-semibold mb-2 hover:text-blue-400 transition-colors duration-300">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h2>
            <p className="info text-sm text-gray-400 mb-4">
              <a href="#" className="author text-blue-300 hover:underline">
                {post.author?.username || 'Unknown Author'}
              </a>
              <time className="ml-2">{new Date(post.createdAt).toLocaleString()}</time>
            </p>
            <p className="summary text-gray-300">{post.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
