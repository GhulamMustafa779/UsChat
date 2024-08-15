import React from "react";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import useRealtimeMessage from "../../hooks/useRealtimeMessage";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  useGetMessages();
  useRealtimeMessage();
  const { chat } = useSelector((store) => store.chat);
  const { authUser } = useSelector((store) => store.user);

  return (
    <div className="max-w-[800px] grow w-100 h-full p-5 overflow-y-scroll new-scrollbar">
      {chat &&
        chat?.map((message, index) => {
          return (
            <Message
              key={index}
              direction={message.senderId === authUser?._id ? "rtl" : "ltr"}
              message={message.message}
            />
          );
        })}
    </div>
  );
};

export default Messages;
