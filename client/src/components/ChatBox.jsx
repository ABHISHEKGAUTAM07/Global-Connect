import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'; // Optional for timestamps

const ChatBox = ({ messages = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-96 overflow-y-auto p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg space-y-3">
      {messages.length === 0 && (
        <div className="text-gray-500 text-sm text-center mt-10">No messages yet. Start a conversation ✨</div>
      )}

      {messages.map((msg, index) => {
        const isSender = msg.senderId === user._id;

        return (
          <div
            key={index}
            className={`flex flex-col ${
              isSender ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`relative px-4 py-2 max-w-xs md:max-w-sm rounded-lg text-sm shadow transition-all duration-300 ${
                isSender
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
              <div className="text-[10px] mt-1 opacity-60">
                {moment(msg.createdAt).format('h:mm A')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
