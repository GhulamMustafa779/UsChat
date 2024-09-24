import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChat } from "../redux/chatSlice";
import { useSocket } from "../components/socketContext/SocketContext";
import { setOtherUsers } from "../redux/userSlice";

const useRealtimeMessage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { chat, chatParticipant } = useSelector((store) => store.chat);
  const { otherUsers } = useSelector((store) => store.user);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (newMessage.senderId === chatParticipant?._id)
        dispatch(setChat([...chat, newMessage]));

      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === newMessage.senderId) {
          return {
            ...user,
            lastMessage: {
              message: newMessage.message,
              createdAt: newMessage.createdAt,
            },
          };
        }
        return user;
      });
      dispatch(setOtherUsers(allParticipants));
    };

    const handleDeleteMessage = ({ messageId, senderId }) => {
      const updatedChat = chat.filter((text) => text._id !== messageId);
      dispatch(setChat(updatedChat));
      const lastText = updatedChat[updatedChat.length - 1];
      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === senderId) {
          const updatedUser = lastText ? {
            ...user,
            lastMessage: {
              _id: lastText._id,
              message: lastText.message,
              createdAt: lastText.createdAt,
            },
          } : {
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
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("deleteMessage", handleDeleteMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("deleteMessage", handleDeleteMessage);
    };
  }, [socket, chat, dispatch, otherUsers, chatParticipant]);
};

export default useRealtimeMessage;
