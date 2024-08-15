import React,{useEffect, useRef} from "react";
import Space from '../Space/Space'

const Message = ({ direction = "ltr", message }) => {
  const scroll = useRef();

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
  },[message])
  return (
    <div ref={scroll} className={`${direction == "ltr" ? "flex" : "flex justify-end"}`}>
      <div
        className={`${
          direction == "ltr" ? "bg-white" : "bg-green-100 "
        } border-none shadow-sm max-w-[600px] rounded-md my-4 p-2`}
      >
        <p className="text-sm text-gray-700">
          {message} <Space/><Space/><Space/><Space/><Space/>
        </p>
        <div className="relative w-full">
          <p className="absolute -top-3 -right-1 text-[10px] h-[5px] text-gray-400 float-end mt-1">12:34</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
