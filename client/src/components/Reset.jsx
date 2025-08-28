import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck, AlertTriangle } from 'lucide-react'; // Optional: install via `lucide-react`

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, {
        password,
      });

      setMessage(res.data.message || "Password has been reset successfully.");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed or token expired.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <LockKeyhole className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Enter and confirm your new password</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all duration-300"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <div className="mt-5 text-green-600 flex items-center gap-2 text-sm justify-center">
            <ShieldCheck className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mt-5 text-red-600 flex items-center gap-2 text-sm justify-center">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
