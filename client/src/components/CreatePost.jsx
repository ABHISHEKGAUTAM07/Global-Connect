import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchPosts } from '../features/post/postSlice';
import { ImagePlus, Loader2 } from 'lucide-react';

const CreatePost = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      await axios.post(`${API}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setContent('');
      setImage(null);
      setPreview(null);
      dispatch(fetchPosts());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-200"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create a Post</h2>

      <textarea
        className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-3 mb-4 resize-none text-sm placeholder-gray-500"
        placeholder="What's on your mind?"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      {/* Upload image section */}
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium">
          <ImagePlus size={20} />
          Add Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Image preview */}
      {preview && (
        <div className="relative mb-4">
          <img
            src={preview}
            alt="Preview"
            className="rounded-lg shadow max-h-64 object-cover w-full"
          />
          <button
            onClick={removeImage}
            type="button"
            className="absolute top-2 right-2 bg-white bg-opacity-80 text-red-600 rounded-full p-1 hover:bg-opacity-100 shadow"
            title="Remove Image"
          >
            ✕
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 text-white py-2 rounded-lg transition duration-200 ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {loading ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
};

export default CreatePost;
