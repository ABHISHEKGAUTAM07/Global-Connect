import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import Feed from './Feed';
import Profile from './Profile';
import Jobs from './Jobs';
import Notification from './Notification'; // ✅ Added Notification import

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const buttonClasses =
    "w-full block text-center bg-gradient-to-r text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#f1f8e9] px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6">
            Welcome to <span className="text-blue-500">Global Connect</span>
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            Where professionals connect, share, and grow together 🌍
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className={`${buttonClasses} from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 w-auto px-6`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`${buttonClasses} from-green-600 to-green-700 hover:from-green-700 hover:to-green-600 w-auto px-6`}
            >
              Register
            </Link>
          </div>
          <p className="text-sm text-gray-400 mt-4 text-center">
            It only takes a few seconds to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f3f4f6] px-2 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        
        {/* Left Sidebar - Profile + Chat */}
        <aside className="col-span-1 bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b">
            <Profile />
            <Link
              to="/profile"
              className={`${buttonClasses} from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 mt-4`}
            >
              Profile
            </Link>
          </div>

          <div className="p-4 border-t flex flex-col h-[40%]">
            <h3 className="text-lg font-bold text-gray-700 mb-2">💬 Chat</h3>
            <div className="flex-1 overflow-auto">
              <ChatBox/>
            </div>
            <Link
              to="/chat"
              className={`${buttonClasses} from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 mt-4`}
            >
              View Chat
            </Link>
          </div>
        </aside>

        {/* Center - Notifications + Feed */}
        <main className="col-span-2 bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <Notification /> {/* ✅ Notifications placed here */}
            <Feed />
          </div>
          <div className="p-4 border-t">
            <Link
              to="/feed"
              className={`${buttonClasses} from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500`}
            >
              View Feed
            </Link>
          </div>
        </main>

        {/* Right Sidebar - Jobs */}
        <aside className="col-span-1 bg-white rounded-2xl shadow-md flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <Jobs />
          </div>
          <div className="p-4 border-t">
            <Link
              to="/jobs"
              className={`${buttonClasses} from-orange-500 to-yellow-500 hover:from-yellow-500 hover:to-orange-500`}
            >
              Go to Jobs
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
