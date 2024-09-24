import React, { useState, useEffect } from "react";
import ChatParticipant from "../ChatParticipant/ChatParticipant";
import { useSelector, useDispatch } from "react-redux";
import { setChatParticipant } from "../../redux/chatSlice";
import { setChat } from "../../redux/chatSlice";

const AllUsers = ({ search }) => {
  const { otherUsers } = useSelector((store) => store.user);
  const { chatParticipant } = useSelector((store) => store.chat);
  const { onlineUsers } = useSelector((store) => store.chat);
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchedUsers = otherUsers?.filter((user) =>
      user.participants[0].fullName.toLowerCase().includes(search.toLowerCase())
    );
    setUsers(searchedUsers);
  }, [search]);

  useEffect(() => {
    if (otherUsers) {
      setUsers(otherUsers);
    }
  }, [otherUsers]);

  const handleSelectedUser = (id) => {
    if (id != chatParticipant?._id) {
      dispatch(setChat(null));
      const participant = otherUsers.filter((user) => user.participants[0]._id=== id);
      dispatch(setChatParticipant(participant[0].participants[0]));
    }
  };

  if (!otherUsers) return;

  return (
    <div className="flex-1 p-2 overflow-x-hidden overflow-y-auto new-scrollbar mt-3">
      {users?.map((user, index) => {
        return (
          <div
            key={index}
            className={`${
              chatParticipant?._id === user.participants[0]._id ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-50`}
            onClick={() => handleSelectedUser(user.participants[0]._id)}
          >
            <ChatParticipant
              message={user.lastMessage}
              user={user.participants[0]}
              online={onlineUsers.includes(user.participants[0]._id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
