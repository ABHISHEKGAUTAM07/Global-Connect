import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchPosts } from '../features/post/postSlice';
import moment from 'moment'; // optional for timestamps

const CommentSection = ({ postId, comments }) => {
  const [text, setText] = useState('');
  const { user } = useSelector(state => state.auth);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_API_URL;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/posts/comment/${postId}`, { text }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setText('');
      dispatch(fetchPosts());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-6">
      {/* Input Box */}
      <form onSubmit={handleComment} className="flex items-center gap-3 mb-5">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full shadow transition duration-200"
        >
          Post
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments?.map((comment, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-gray-100 rounded-lg p-3 shadow-sm"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs font-bold">
              {comment.userId?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">
                {comment.userId?.name || 'User'}
              </div>
              <div className="text-sm text-gray-700">{comment.text}</div>
              <div className="text-xs text-gray-400 mt-1">
                {moment(comment.createdAt).fromNow()}
              </div>
            </div>
          </div>
        ))}

        {comments?.length === 0 && (
          <p className="text-sm text-gray-500 text-center">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
