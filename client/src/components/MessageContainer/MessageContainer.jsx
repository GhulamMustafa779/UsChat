import React from "react";
import Avatar from "../Avatar/Avatar";
import Messages from "../Messages/Messages";
import { useSelector } from "react-redux";
import MessageInput from "../MessageInput/MessageInput";

const MessageContainer = () => {
  const { chatParticipant } = useSelector((store) => store.chat);
  const { onlineUsers } = useSelector((store) => store.chat);

  return (
    chatParticipant && (
      <div className="flex flex-col justify-center items-cente h-full w-100">
        <div className="h-100 w-100 border-b-2 border-gray-100 shadow-sm">
          <div className=" flex items-center gap-3 h-full p-3">
            <Avatar
              src={chatParticipant?.profilePhoto}
              size=""
              online={onlineUsers?.includes(chatParticipant?._id)}
            />
            <h3 className="font-medium text-gray-500">
              {chatParticipant?.fullName}
            </h3>
          </div>
        </div>
        <div className="flex justify-center w-full h-full bg-green-50 overflow-hidden">
          <Messages />
        </div>
        <MessageInput />
      </div>
    )
  );
};

export default MessageContainer;
