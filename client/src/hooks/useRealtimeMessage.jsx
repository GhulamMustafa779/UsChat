import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChat } from "../redux/chatSlice";
import { useSocket } from "../components/socketContext/SocketContext";
import { setOtherUsers } from "../redux/userSlice";

const useRealtimeMessage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { chat, chatParticipant } = useSelector((store) => store.chat);
  const { otherUsers } = useSelector((store) => store.user);

  const handleNewMessage = useCallback(
    (newMessage) => {
      if (newMessage.senderId === chatParticipant?._id) {
        dispatch(setChat([...chat, { ...newMessage, status: "delivered" }]));
      }

      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === newMessage.senderId) {
          return {
            ...user,
            lastMessage: {
              message: newMessage.message,
              createdAt: newMessage.createdAt,
              status: "delivered",
              senderId: newMessage.senderId,
            },
          };
        }
        return user;
      });
      dispatch(setOtherUsers(allParticipants));
      socket.emit("messageReceived", newMessage._id);
    },
    [chat, chatParticipant, otherUsers, dispatch, socket]
  );

  const handleDeleteMessage = useCallback(
    ({ messageId, senderId }) => {
      const updatedChat = chat.filter((text) => text._id !== messageId);
      dispatch(setChat(updatedChat));

      const lastText = updatedChat[updatedChat.length - 1];
      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === senderId) {
          const updatedUser = lastText
            ? {
                ...user,
                lastMessage: {
                  _id: lastText._id,
                  message: lastText.message,
                  createdAt: lastText.createdAt,
                  senderId: lastText.senderId,
                },
              }
            : {
                ...user,
                lastMessage: null,
              };
          return updatedUser;
        }
        return user;
      });
      if (allParticipants) {
        dispatch(setOtherUsers(allParticipants));
      }
    },
    [chat, otherUsers, dispatch]
  );

  const handleMessageDelivered = useCallback(
    (message) => {
      if (chatParticipant?._id !== message.receiverId) return;

      const updatedChat = chat.map((text) => {
        if (text._id === message._id) {
          return message;
        }
        return text;
      });
      dispatch(setChat(updatedChat));

      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === message.receiverId) {
          return {
            ...user,
            lastMessage: {
              _id: message._id,
              message: message.message,
              createdAt: message.createdAt,
              status: message.status,
              senderId: message.senderId,
            },
          };
        }
        return user;
      });
      if (allParticipants) {
        dispatch(setOtherUsers(allParticipants));
      }
    },
    [chat, chatParticipant, otherUsers, dispatch]
  );

  const handleMessagesDelivered = useCallback(
    ({ messageIds, receiverId }) => {
      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === receiverId) {
          return {
            ...user,
            lastMessage: {
              ...user.lastMessage,
              status: "delivered",
            },
          };
        }
        return user;
      });
      if (allParticipants) {
        dispatch(setOtherUsers(allParticipants));
      }

      if (chatParticipant?._id !== receiverId) return;

      const updatedChat = chat.map((text) => {
        if (messageIds.includes(text._id)) {
          return {
            ...text,
            status: "delivered",
          };
        }
        return text;
      });
      dispatch(setChat(updatedChat));
    },
    [chat, chatParticipant, otherUsers, dispatch]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", handleNewMessage);
    socket.on("deleteMessage", handleDeleteMessage);
    socket.on("messageDelivered", handleMessageDelivered);
    socket.on("messagesDelivered", handleMessagesDelivered);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("deleteMessage", handleDeleteMessage);
      socket.off("messageDelivered", handleMessageDelivered);
      socket.off("messagesDelivered", handleMessagesDelivered);
    };
  }, [
    socket,
    handleNewMessage,
    handleDeleteMessage,
    handleMessageDelivered,
    handleMessagesDelivered,
  ]);
};

export default useRealtimeMessage;
