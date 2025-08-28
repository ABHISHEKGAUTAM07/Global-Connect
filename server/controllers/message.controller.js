const Message = require('../models/Message');


exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      senderId: req.user._id,
      receiverId: req.body.receiverId,
      content: req.body.content
    });

    const fullMsg = {
      senderId: message.senderId.toString(),
      receiverId: message.receiverId.toString(),
      content: message.content,
      timestamp: message.timestamp
    };
    console.log(fullMsg)
    // Real-time emit
    global.io.to(fullMsg.receiverId).emit('newMessage', fullMsg);
    global.io.to(fullMsg.senderId).emit('newMessage', fullMsg);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: sender, receiverId: receiver },
        { senderId: receiver, receiverId: sender }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
