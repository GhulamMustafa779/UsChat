import React,{useEffect} from "react";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import useRealtimeMessage from "../../hooks/useRealtimeMessage";
import { SocketProvider } from "../../components/socketContext/SocketContext";

const Chat = () => {
  const {isSet} = useGetAllUsers();

  return (
    <SocketProvider>
      <div className="grid items-center h-[100vh] overflow-hidden p-4">
      <div className="bg-white h-full rounded-[20px] overflow-hidden flex">
        <ChatSidebar />
        <div className="w-full h-full">
          <MessageContainer />
        </div>
      </div>
    </div>
    </SocketProvider>
  );
};

export default Chat;
