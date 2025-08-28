import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FaBell, FaCheck } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { addNotification, markAllRead } from '../features/notification/notificationSlice';

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const { items } = useSelector(state => state.notification);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user) return;

    const socket = io(API, { withCredentials: true });
    socket.emit('register', token);

    socket.on('new_notification', notif => {
      dispatch(addNotification(notif));
    });

    return () => {
      socket.disconnect();
    };
  }, [user, dispatch]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        res.data.forEach(notif => dispatch(addNotification(notif)));
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API}/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(markAllRead());
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const formatTime = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
    const units = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];
    for (let unit of units) {
      const count = Math.floor(diff / unit.seconds);
      if (count >= 1) return `${count} ${unit.label}${count > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  if (loading) {
    return <div className="p-6 text-gray-500 text-center animate-pulse">Loading notifications...</div>;
  }
  if (!items.length) {
    return <div className="p-6 text-gray-500 text-center">No notifications yet.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-indigo-600">
        <FaBell className="text-yellow-500 animate-bounce" /> Notifications
      </h2>

      <div className="space-y-4">
        {items.map(notification => (
          <div
            key={notification._id}
            className={`p-5 rounded-lg shadow-md border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
              notification.read
                ? 'bg-gray-50 border-gray-200'
                : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-800 font-medium">{notification.content}</p>
                <p className="text-xs text-gray-500 mt-1">{formatTime(notification.createdAt)}</p>
              </div>

              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  className="ml-4 px-3 py-1 bg-indigo-500 text-white text-xs rounded-full flex items-center gap-1 hover:bg-indigo-600 transition duration-200 shadow-sm hover:shadow-md"
                >
                  <FaCheck /> Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
