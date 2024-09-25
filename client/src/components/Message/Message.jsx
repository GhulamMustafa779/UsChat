import React, { useEffect, useRef, useState } from "react";
import Space from "../Space/Space";
import MessageDropdown from "../MessageDropdown/MessageDropdown";
import { useSelector } from "react-redux";
import MessageStatus from "../MessageStatus/MessageStatus";

const Message = ({ message, index, textIndex, setTextIndex }) => {
  const scroll = useRef();
  const { authUser } = useSelector((store) => store.user);
  const isUser = message.senderId === authUser?._id;
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className={` ${isUser ? "flex justify-end" : "flex justify-start"}`}>
      <div
        className={`${
          isUser ? "flex flex-row-reverse ps-5 " : "flex pe-5 "
        } items-center gap-5`}
        onMouseOver={() => setTextIndex(index)}
        onMouseOut={() => setTextIndex(null)}
      >
        <div
          className={`${
            isUser ? "bg-green-100" : "bg-white"
          } border-none shadow-sm max-w-[600px] rounded-md my-4 p-2`}
        >
          <p className="text-sm text-gray-700">
            {message.message} <Space />
            <span className="inline-block text-[10px] h-[5px] text-gray-400 float-end mt-1 text-nowrap">
              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              { isUser &&
                <MessageStatus status={message.status} />}
            </span>
          </p>
          {/* <div className="relative w-full">
            <p className="absolute -top-2 -right-1 text-[10px] h-[5px] text-gray-400 float-end mt-1 text-nowrap">
              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div> */}
        </div>
        {isUser && index === textIndex && (
          <MessageDropdown
            senderId={message.senderId}
            receiverId={message.receiverId}
            id={message._id}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
