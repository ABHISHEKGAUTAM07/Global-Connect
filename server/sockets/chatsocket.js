module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🔌 A user connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`✅ Joined room: ${userId}`);
    });

    socket.on('sendMessage', (msg) => {
      console.log("📤 Message send event triggered:", msg);

      const { senderId, receiverId, content, createdAt } = msg;

      const fullMsg = {
        senderId,
        receiverId,
        content,
        createdAt: createdAt || new Date().toISOString(),
      };

      // Send to receiver only (avoid duplicate to sender)
      io.to(receiverId).emit('newMessage', fullMsg); // receiver ke sabhi active tabs ko bhejo
      io.to(senderId).emit('newMessage', fullMsg);   // sender ko bhi bhejo (duplicate ka tension nahi - handleNewMessage check karega)

      // socket.to(receiverId).emit('newMessage', fullMsg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected:', socket.id);
    });
  });
};
