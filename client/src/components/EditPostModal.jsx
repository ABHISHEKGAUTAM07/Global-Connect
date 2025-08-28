import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../features/post/postSlice';
import { X, Loader2, ImagePlus } from 'lucide-react';

const EditPostModal = ({ post, closeModal }) => {
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      setLoading(true);
      await axios.put(`${API}/posts/${post._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      closeModal();
      dispatch(fetchPosts());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removePreview = () => {
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Your Post</h2>

        <form onSubmit={handleUpdate}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md p-3 mb-4 text-sm placeholder-gray-500"
            placeholder="Update your thoughts..."
            required
          />

          {/* Upload image section */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium">
              <ImagePlus size={20} />
              Update Image
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
                className="rounded-lg shadow max-h-56 object-cover w-full"
              />
              <button
                onClick={removePreview}
                type="button"
                className="absolute top-2 right-2 bg-white bg-opacity-80 text-red-600 rounded-full p-1 hover:bg-opacity-100 shadow"
                title="Remove Image"
              >
                ✕
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-600 hover:text-gray-800 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white transition ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
