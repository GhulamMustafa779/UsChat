import React,{useMemo} from "react";
import Avatar from "../Avatar/Avatar";

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date >= today) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (date >= yesterday) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
}

const ChatParticipant = ({ message, user, online }) => {

  const formattedDate = useMemo(() => formatDate(message.createdAt), [message.createdAt]);

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
          <p className="text-gray-500 text-[10px] font-regular">{formattedDate}</p>
        </div>
        <p className="font-regular text-sm pt-1 text-gray-500 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
          {message ? message.message : ""}
        </p>
      </div>
    </div>
  );
};

export default ChatParticipant;
