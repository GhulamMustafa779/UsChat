import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChat } from "../redux/chatSlice";
import { useSocket } from "../components/socketContext/SocketContext";

const useRealtimeMessage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { chat } = useSelector((store) => store.chat);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(setChat([...chat, newMessage]));
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
