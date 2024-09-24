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
      dispatch(setChat([...chat, newMessage]));

      const allParticipants = otherUsers.map((user) => {
        if (user?.participants?.[0]?._id === chatParticipant?._id) {
          return {
            ...user,
            lastMessage: {
              message: newMessage.message,
              createdAt: newMessage.createdAt
            },
          };
        }
        return user;
      });
      console.log(allParticipants)
      dispatch(setOtherUsers(allParticipants));
    };

    const handleDeleteMessage = (messageId) => {
      const updatedChat = chat.filter((text) => text._id !== messageId);
      dispatch(setChat(updatedChat));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("deleteMessage", handleDeleteMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("deleteMessage", handleDeleteMessage);
    };
  }, [socket, chat, dispatch]);
};

export default useRealtimeMessage;
