import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchPosts } from '../features/post/postSlice';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImage, setEditedImage] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const isOwner = user && user._id === (post.userId?._id || post.userId);
  const hasLiked = post.likes.includes(user?._id);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(fetchPosts());
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', editedContent);
      if (editedImage) formData.append('image', editedImage);

      await axios.put(`${API}/posts/${post._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsEditing(false);
      dispatch(fetchPosts());
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`${API}/posts/like/${post._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(fetchPosts());
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      await axios.post(`${API}/posts/comment/${post._id}`, { text: commentText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCommentText('');
      dispatch(fetchPosts());
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-5 mb-8 relative">

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-semibold">
            {post.userId?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.userId?.name || 'Anonymous'}</h3>
            <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      {isEditing ? (
        <>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full border rounded-lg p-2 mt-2 text-sm"
            rows={3}
          />
          <input
            type="file"
            onChange={(e) => setEditedImage(e.target.files[0])}
            className="mt-2"
          />
          <div className="mt-3 flex gap-3">
            <button onClick={handleUpdate} disabled={loading} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition">Save</button>
            <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:underline">Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-gray-800">{post.content}</p>
          {post.image && (
            <img
              src={`${API}${post.image}`}
              alt="Post visual"
              className="mt-4 w-full max-h-[400px] object-cover rounded-lg border"
            />
          )}
        </>
      )}

      {/* Action buttons */}
      <div className="mt-5 flex gap-6 text-sm text-gray-600 font-medium">
        <button onClick={handleLike} className="hover:text-blue-600 transition">
          {hasLiked ? '💙 Liked' : '🤍 Like'} ({post.likes.length})
        </button>
        <button onClick={() => setShowComments(!showComments)} className="hover:text-blue-600 transition">
          💬 Comments ({post.comments.length})
        </button>

        {isOwner && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} className="hover:text-green-600 transition">✏️ Edit</button>
            <button onClick={handleDelete} className="hover:text-red-600 transition">🗑️ Delete</button>
          </>
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          {post.comments.map((c, i) => (
            <div key={i} className="mb-3 border-b pb-2">
              <div className="text-sm font-semibold text-gray-800">{c.userId?.name || 'User'}:</div>
              <div className="text-sm text-gray-700">{c.text}</div>
              <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
            </div>
          ))}

          <div className="flex items-center gap-3 mt-3">
            <input
              type="text"
              className="flex-1 border p-2 rounded text-sm"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button
              onClick={handleComment}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 flex items-center justify-center rounded-xl">
          <span className="text-blue-600 font-semibold animate-pulse">Processing...</span>
        </div>
      )}
    </div>
  );
};

export default PostCard;
