import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBell } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const { unreadCount } = useSelector((state) => state.notification);

  const navItems = [
    { path: '/feed', label: 'Feed', icon: <FaHome /> },
    { path: '/notifications', label: 'Notifications', icon: <FaBell /> },
  ];

  return (
    <div className="w-64 bg-white/80 backdrop-blur-lg shadow-xl h-screen fixed top-0 left-0 p-6 border-r border-gray-200">
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {item.icon}
              {item.label}

              {item.path === '/notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-sm">
                  {unreadCount}
                </span>
              )}

              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded-tr-lg rounded-br-lg"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
