import { Server } from "socket.io";
import { Message } from "../models/messageModel.js";

let userSocketMap = {};

export const getSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      // origin: "https://192.168.228.220:5173",
      origin: "https://192.168.18.26:5173",
      // origin: "https://192.168.10.4:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
      userSocketMap[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(userSocketMap));

      const sentMessages = await Message.find({
        status: "sent",
        receiverId: userId,
      });

      const messagesBySender = sentMessages.reduce((acc, msg) => {
        acc[msg.senderId] = acc[msg.senderId] || [];
        acc[msg.senderId].push(msg._id);
        return acc;
      }, {});

      await Message.updateMany(
        { status: "sent", receiverId: userId },
        { $set: { status: "delivered" } }
      );

      for (const senderId in messagesBySender) {
        if (userSocketMap[senderId]) {
          io.to(userSocketMap[senderId]).emit("messagesDelivered", {
            messageIds: messagesBySender[senderId],
            receiverId: userId
          });
        }
      }
      console.log("user connected : ", socket.id, userId);
    }

    

    socket.on("disconnect", () => {
      console.log("User disconnected ", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  io.on("connection", (socket) => {
    socket.on("messageReceived", async (messageId) => {
      const message = await Message.findById({ _id: messageId });
      if (message) {
        message.status = "delivered";
        await message.save();
        const socketId = getSocketId(message.senderId);
        if (socketId) {
          io.to(socketId).emit("messageDelivered", message);
        }
      }
    });
  });

  return io;
};

export default setupSocketIO;
