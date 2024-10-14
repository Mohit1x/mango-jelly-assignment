import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  receiveMessage,
  selectMessages,
} from "./features/chat/chatSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const endOfMessagesRef = useRef(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      dispatch(sendMessage(inputValue));
      setInputValue("");

      // Simulate message reception
      setTimeout(() => {
        dispatch(receiveMessage("Hello from User2!"));
      }, 1000);
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <List sx={{ maxHeight: 400, overflowY: "auto", mb: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.user}: ${msg.text}`}
              secondary={new Date(msg.timestamp).toLocaleTimeString()}
            />
          </ListItem>
        ))}
        <div ref={endOfMessagesRef} />
      </List>
      <Box display="flex">
        <TextField
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
