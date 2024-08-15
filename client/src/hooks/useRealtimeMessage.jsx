import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChat } from "../redux/chatSlice";
import { useSocket } from "../components/socketContext/SocketContext";

const useRealtimeMessage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const { chat } = useSelector((store) => store.chat);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        dispatch(setChat([...chat, newMessage]));
      });
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, chat, dispatch]);
};

export default useRealtimeMessage;
