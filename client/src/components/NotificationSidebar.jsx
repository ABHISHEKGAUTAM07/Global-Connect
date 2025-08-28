import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Bell, Clock } from "lucide-react";

const NotificationSidebar = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${API}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [API, token]);

  return (
    <div className="p-4 h-screen overflow-y-auto border-l bg-white shadow-inner">
      {/* Header */}
      <div className="sticky top-0 bg-white pb-3 mb-4 border-b flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
      </div>

      {/* No notifications */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-10">
          No notifications yet 📭
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((notif) => {
            let displayText = notif.content;
            if (displayText.includes(user.name)) {
              displayText = displayText.replace(user.name, "You");
            }

            return (
              <div
                key={notif._id}
                className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
              >
                <p className="text-gray-800 text-sm leading-relaxed">{displayText}</p>
                {notif.createdAt && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(notif.createdAt).toLocaleString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationSidebar;
