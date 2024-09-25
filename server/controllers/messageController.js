import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getSocketId } from "../socket/socket.js";
import  { io }  from "../index.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    const socketId = getSocketId(receiverId);

    if (socketId) {
      console.log(newMessage.message, " sent to ----------------- ", socketId);
      io.to(socketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      newMessage,
      message: "Message send successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const { receiverId } = req.body;
    if (!receiverId) {
      return res.status(401).json({ message: "Invalid request!" });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Invalid message ID." });
    }
    const senderId = message.senderId;
    await message.deleteOne();

    const conversation = await Conversation.findOne({ messages: messageId });

    if (conversation) {
      conversation.messages.pull(messageId);
    
      const updatedConversation = await conversation.save();

      if (updatedConversation) {
        const socketId = receiverSocketId(receiverId);

        if (socketId) {
          console.log("delete request sent to ----------------- ", socketId);
          io.to(socketId).emit("deleteMessage", {messageId, senderId});
        }
        return res.status(200).json({ message: "Message deleted successfully!" });
      }
    }
    
    return res
      .status(400)
      .json({ message: "Message was not found in any conversation." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};
