import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { setChat } from "../../redux/chatSlice";
import { setOtherUsers } from "../../redux/userSlice";

const MessageDropdown = ({ senderId, receiverId, id }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { chat } = useSelector((state) => state.chat);
  const { otherUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteText = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/message/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          receiverId,
        },
        withCredentials: true,
      });

      if (res.data.message) {
        toast.success(res.data.message);
        const newChat = chat.filter((text) => text._id !== id);
        dispatch(setChat(newChat));
        const lastText = newChat[newChat.length - 1];
        const allParticipants = otherUsers.map((user) => {
          if (user?.participants?.[0]?._id === receiverId) {
            const updatedUser = lastText ? {
              ...user,
              lastMessage: {
                _id: lastText._id,
                message: lastText.message,
                createdAt: lastText.createdAt,
              },
            }:{
              ...user,
              lastMessage: null,
            };
            return updatedUser;
          }
          return user;
        });
        if (allParticipants) {
          dispatch(setOtherUsers(allParticipants));
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      //toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div
        onClick={() => setToggleDropdown(true)}
        className="relative p-1 border border-gray-400 bg-gray-50 rounded-md"
      >
        <FaChevronDown className="text-xs text-gray-400" />
        {toggleDropdown && (
          <ul className="absolute top-5 left-0 mt-3 bg-gray-100 border border-gray-300 rounded-sm">
            <li
              className="text-xs text-zinc-500 px-4 py-2 font-medium hover:bg-zinc-200 border border-transparent rounded:md"
              onClick={handleDeleteText}
            >
              Delele
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageDropdown;
