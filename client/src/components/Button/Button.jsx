import React from "react";

const Button = ({ btnType, type, size, width, text, funCall = () => {} }) => {
  if (btnType == "primary") {
    return (
      <button
        type={type}
        className={`${
          size == "lg" ? "text-sm" : "text-xs"
        } ${width} text-white bg-green-400 border-none rounded py-1 mt-3 font-medium hover:bg-green-500 cursor-pointer drop-shadow hover:drop-shadow-sm`}
        onClick={funCall}
      >
        {text}
      </button>
    );
  } else {
    return (
      <button type={type} className={`${size} `} onClick={funCall}>
        {text}
      </button>
    );
  }
};

export default Button;
