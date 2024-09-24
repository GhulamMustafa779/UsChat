import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "./../../utils/constants";
import { useNavigate } from 'react-router-dom';

const AddChatModal = ({ isOpen, setIsOpen }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const handleAddChat = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/conversation/${username}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data && res.status === 200) {
        toast.success(res.data.message);
        setIsOpen(false);
        navigate(0);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="absolute top-0 left-0 z-20 flex justify-center items-center w-full h-full bg-zinc-50 bg-opacity-50">
      <div className="min-w-[300px] bg-white border rounded-md px-3 py-5">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-lg text-gray-700">New Chat</h1>
          <BsX
            className="text-zinc-400 hover:text-red-400 font-semibold text-2xl"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-sm border border-gray-400 w-full rounded-md mt-1 px-2 py-1 outline-none"
          />
          <p className="text-sm text-gray-400 mt-1">
            Enter username of the user to add chat
          </p>
        </div>
        <div className="flex gap-2 justify-end mt-3">
          <button
            onClick={handleAddChat}
            className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-2 py-1 mt-3 border-none rounded-md"
          >
            Add Chat
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-500 hover:text-white text-sm font-semibold px-2 py-1 mt-3 border-none rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChatModal;
