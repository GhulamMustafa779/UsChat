import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { BASE_URL } from "../../utils/constants";
import { setOnlineUsers } from "../../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let newSocket = io(BASE_URL, {
        query: {
          userId: authUser?._id,
        },
      }); // Replace with your server URL
      setSocket(newSocket);

    newSocket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    return () => newSocket.close(); // Cleanup the socket connection when the component unmounts
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
