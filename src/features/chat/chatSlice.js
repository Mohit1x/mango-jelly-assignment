import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    user: "User1",
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        text: action.payload,
        user: state.user,
        timestamp: new Date().toISOString(),
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        text: action.payload,
        user: "User2",
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export const selectMessages = (state) => state.chat.messages;
export const selectUser = (state) => state.chat.user;
export default chatSlice.reducer;
