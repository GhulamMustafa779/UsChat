import React, { useState, useRef, useEffect } from "react";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import useRealtimeMessage from "../../hooks/useRealtimeMessage";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  useGetMessages();
  useRealtimeMessage();
  const { chat } = useSelector((store) => store.chat);
  const [textIndex, setTextIndex] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [chat]);

  if (!chat) return;

  return (
    <div
      ref={messagesEndRef}
      className="flex-col max-w-[800px] grow w-100 h-full p-5 overflow-y-scroll new-scrollbar"
    >
      {chat &&
        chat.map((message, index) => {
          return (
            <Message
              key={index}
              message={message}
              index={index}
              textIndex={textIndex}
              setTextIndex={setTextIndex}
            />
          );
        })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;
