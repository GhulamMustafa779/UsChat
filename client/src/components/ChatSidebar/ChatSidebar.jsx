import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import AllUsers from "../AllUsers/AllUsers";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers } from "../../redux/userSlice";
import toast from "react-hot-toast";
import { setChat, setChatParticipant } from "../../redux/chatSlice";
import { BASE_URL } from "../../utils/constants";

const ChatSidebar = () => {
  const [search, setSreach] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandle = (e) => {
    const { value } = e.target;
    setSreach(value);
  };

  const logoutHandle = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/logout`);

      if (res) {
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setChat(null));
        dispatch(setChatParticipant(null));
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 bg-opacity-50 max-w-[350px] min-w-[200px] w-full p-4 border-e-2 border-gray-50">
      <h1 className="text-green-600 font-bold text-3xl py-5">ChatUs</h1>
      <SearchBar
        type="search"
        placeholder={"Search"}
        name="search"
        value={search}
        changeHandle={changeHandle}
      />
      <AllUsers search={search} />
      <div
        className="flex items-center justify-center gap-2 mt-4 text-gray-500 hover:text-gray-700 py-1"
        onClick={logoutHandle}
      >
        <MdOutlineLogout />
        <p className="text-md font-medium">Logout</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
