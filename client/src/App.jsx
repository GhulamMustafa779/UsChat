import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./screens/signIn/SignIn";
import SignUp from "./screens/signUp/SignUp";
import Chat from "./screens/chat/Chat";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./components/socketContext/SocketContext";

const router = createBrowserRouter([
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <RouterProvider router={router} />
        <Toaster position="top-left" reverseOrder={false} />
      </SocketProvider>
    </div>
  );
}

export default App;
