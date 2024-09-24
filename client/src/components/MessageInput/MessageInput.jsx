import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../redux/chatSlice";
import { BASE_URL } from "../../utils/constants";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { chatParticipant } = useSelector((store) => store.chat);
  const { chat } = useSelector((store) => store.chat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${BASE_URL}/api/message/send/${chatParticipant?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        dispatch(setChat([...chat, res.data.newMessage]));
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-100 p-3 bg-gray-100 border-t-2 border-grey-100 flex justify-center items-center gap-3"
    >
      <input
        type="text"
        placeholder="Type a message"
        name="typing-input"
        value={message}
        className="bg-white border-none outline-none px-5 py-3 w-full rounded-full text-sm text-gray-600"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={!message}>
        <IoIosSend className="text-green-800 text-4xl hover:bg-gray-200 rounded-lg" />
      </button>
    </form>
  );
};

export default MessageInput;
