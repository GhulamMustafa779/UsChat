import React from "react";
import Avatar from "../Avatar/Avatar";

const ChatParticipant = ({ message = "", imgSrc, name, date, online }) => {
  return (
    <div className="w-full flex gap-3 p-2 rounded-md mt-4 shadow-sm">
      <Avatar src={imgSrc} size="" online={online} />
      <div className="w-3/4">
        <div className="flex items-center justify-between gap-2 w-full overflow-hidden">
          <h3
            className="font-medium text-sm text-gray-600 text-nowrap text-ellipsis overflow-hidden"
            title={name}
          >
            {name}
          </h3>
          <p className="text-gray-500 text-[10px] font-regular">{date}</p>
        </div>
        {/* <p className="font-regular text-sm pt-1 text-gray-500 text-nowrap text-ellipsis overflow-hidden whitespace-nowrap">
          {message}
        </p> */}
      </div>
    </div>
  );
};

export default ChatParticipant;
