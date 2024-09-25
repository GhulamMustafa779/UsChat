import React, { useMemo } from "react";
import Avatar from "../Avatar/Avatar";
import MessageStatus from "../MessageStatus/MessageStatus";
import { useSelector } from "react-redux";

function formatDate(createdAt) {
  if (createdAt) {
    const date = new Date(createdAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date >= today) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date >= yesterday) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  }
  return "";
}

const ChatParticipant = ({ message, user, online }) => {
  const { authUser } = useSelector((state) => state.user);

  const formattedDate = useMemo(() => {
    if (message?.createdAt) return formatDate(message.createdAt);
    else return "";
  }, [message?.createdAt]);

  return (
    <div className="w-full flex gap-3 p-2 rounded-md mt-4 shadow-sm">
      <Avatar src={user.profilePhoto} size="" online={online} />
      <div className="w-3/4">
        <div className="flex items-center justify-between gap-2 w-full overflow-hidden">
          <h3
            className="font-medium text-sm text-gray-600 text-nowrap text-ellipsis overflow-hidden"
            title={user.fullName}
          >
            {user.fullName}
          </h3>
          <p className="text-gray-500 text-[10px] font-regular">
            {formattedDate}
          </p>
        </div>
        <div className="w-full flex items-center gap-2  pt-1">
          {message && message.senderId === authUser?._id && (
            <MessageStatus status={message.status} />
          )}
          <p className="font-regular text-sm text-gray-500 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
            {message ? message.message : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatParticipant;
