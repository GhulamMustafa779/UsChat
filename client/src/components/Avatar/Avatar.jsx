import React from "react";
import avatar from "../../assets/Avatar.png";

const Avatar = ({ src, size, online }) => {
  return (
    <div
      className={`${
        size == "small" ? "w-10 h-10 min-w-10" : "w-12 h-12 min-w-12"
      } rounded-full bg-green-200 p-[2px] relative`}
    >
      <img src={avatar} alt="" className="w-full h-full rounded-full" />
      {online && (
        <div className="absolute top-0 right-0 h-[12px] w-[12px] bg-green-400 rounded-full border border-white"></div>
      )}
    </div>
  );
};

export default Avatar;
