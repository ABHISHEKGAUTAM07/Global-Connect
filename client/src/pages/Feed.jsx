import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/post/postSlice';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import { Link } from 'react-router-dom'; 

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.post);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) dispatch(fetchPosts());
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="p-10 text-center text-gray-600 text-xl">
        🚫 Please <span className="font-semibold text-blue-600"><Link to="/login" className="font-semibold text-blue-600">Log in</Link></span> to view the feed.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-800 flex items-center gap-2">
        🌍 Global Feed
      </h2>

      <div className="mb-6">
        <CreatePost />
      </div>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 rounded-lg shadow-md"
            ></div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-10">No posts yet. Be the first to share something! ✨</p>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post._id}
              className="transition duration-300 ease-in-out transform hover:scale-[1.02]"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
