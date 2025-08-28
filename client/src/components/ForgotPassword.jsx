import React, { useState } from 'react';
import axios from 'axios';
import { MailIcon } from 'lucide-react'; // Optional: Install lucide-react for better icons

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      setMessage(res.data.message || 'Reset link sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-blue-300">
        <div className="flex items-center justify-center mb-6">
          <MailIcon className="h-10 w-10 text-blue-600" />
        </div>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Forgot Password</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg hover:opacity-90 transition-all duration-300"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
