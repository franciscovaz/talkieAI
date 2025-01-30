import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { sendMessageToAI } from '../services/api';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const aiResponse = await sendMessageToAI(text);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Fixed Header */}
      <Box sx={{ bgcolor: '#1976d2', color: '#fff', p: 2, boxShadow: 2 }}>
        <Typography variant="h6">English Tutor</Typography>
      </Box>

      {/* Scrollable Message List */}
      <MessageList messages={messages} />

      {/* Fixed Input Area */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 2, boxShadow: 2 }}>
        <MessageInput onSend={handleSend} />
      </Box>
    </Box>
  );
};

export default ChatInterface;