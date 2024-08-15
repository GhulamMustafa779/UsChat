import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatParticipant: null,
    chat: null,
    onlineUsers: null,
  },
  reducers: {
    setChatParticipant: (state, action) => {
      state.chatParticipant = action.payload;
    },
    setChat: (state, action) => {
      state.chat = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setChatParticipant, setChat, setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;
