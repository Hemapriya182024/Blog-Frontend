



import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatISO9075 } from 'date-fns';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://blog-backend-c6mq.onrender.com/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProfile(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog-backend-c6mq.onrender.com/post/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Check if the logged-in user is the author
  useEffect(() => {
    if (profile && post) {
      console.log('Profile:', profile);
      console.log('Post:', post);
      if (profile.id && post.author && post.author._id) {
        setIsAuthor(profile.id === post.author._id);
      }
    }
  }, [profile, post]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center text-white">Error loading post. Please try again later.</div>;
  }

  return (
    <div className="post-page bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
        <time className="text-sm text-gray-400">
          {post?.createdAt ? formatISO9075(new Date(post.createdAt)) : 'Date not available'}
        </time>
        <div className="author text-sm text-gray-300 mb-6">
          by @{post?.author?.username || 'Unknown'}
        </div>

        {isAuthor && (
          <div className="edit-row mb-6">
            <Link className="edit-btn hover:text-blue-400 transition-colors duration-300" to={`/edit/${post._id}`}>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300">
                Edit this post
              </button>
            </Link>
          </div>
        )}

        <div className="image mb-8">
          <img
            src={`https://blog-backend-c6mq.onrender.com/${post.cover}`}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="content text-lg leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default PostPage;
