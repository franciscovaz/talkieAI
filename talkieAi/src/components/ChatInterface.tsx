import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // TODO replace with real AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: 'This is a simulated AI response.',
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ bgcolor: '#1976d2', color: '#fff', p: 2 }}>
        <Typography variant="h6">TalkieAi</Typography>
      </Box>
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </Box>
  );
};

export default ChatInterface;