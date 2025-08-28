import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User, Mail, BadgeCheck, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="p-6 text-gray-600">
        Please <Link to="/login" className="font-semibold text-blue-600">log in</Link> to view your profile.
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <User className="w-6 h-6 text-blue-500" />
        Your Profile
      </h2>

      <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm space-y-4 text-sm text-gray-800 overflow-hidden">
        <div className="flex items-start gap-2 break-all">
          <User className="w-4 h-4 mt-1 text-gray-500" />
          <span><strong>Name:</strong> {user.name}</span>
        </div>

        <div className="flex items-start gap-2 break-all">
          <Mail className="w-4 h-4 mt-1 text-gray-500" />
          <span><strong>Email:</strong> {user.email}</span>
        </div>

        <div className="flex items-start gap-2 break-all">
          <BadgeCheck className="w-4 h-4 mt-1 text-gray-500" />
          <span><strong>ID:</strong> {user._id}</span>
        </div>

        <div className="flex items-start gap-2 break-words">
          <ShieldCheck className="w-4 h-4 mt-1 text-gray-500" />
          <span>
            <strong>Role:</strong>{' '}
            <span className={user.isAdmin ? 'text-red-600 font-semibold' : 'text-green-600 font-medium'}>
              {user.isAdmin ? 'Admin' : 'User'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
