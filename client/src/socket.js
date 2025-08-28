// // client/src/socket.js
// import { io } from 'socket.io-client';

// const socket = io(import.meta.env.VITE_API_URL, {
//   transports: ['websocket'],
//   autoConnect: false,
// });

import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // ensure WebSocket direct connect
});

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);
});
socket.on("disconnect", () => {
  console.log("❌ Disconnected from server");
});
export default socket;
