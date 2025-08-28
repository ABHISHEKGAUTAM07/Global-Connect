import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-10 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-blue-700 transition">
        Global Connect
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-4 text-sm md:text-base font-medium items-center">
        {user ? (
          <>
            <NavLink to="/feed" label="Feed" />
            <NavLink to="/chat" label="Chat" />
            <NavLink to="/jobs" label="Jobs" />
            <NavLink to="/profile" label="Profile" />
            {user.email === 'admin@global.com' && (
              <NavLink
                to="/admin"
                label={
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">Admin</span>
                }
              />
            )}
          </>
        ) : (
          <>
            <NavButton to="/login" label="Login" />
            <NavButton to="/register" label="Register" />
          </>
        )}
      </div>
    </nav>
  );
};

// Basic link for logged-in users
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-blue-600 transition duration-200"
  >
    {label}
  </Link>
);

// Button-like link for auth actions
const NavButton = ({ to, label }) => (
  <Link
    to={to}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition text-sm"
  >
    {label}
  </Link>
);

export default Navbar;
