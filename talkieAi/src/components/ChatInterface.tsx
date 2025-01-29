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

  // Function to speak text using the Web Speech API
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language to English
      utterance.rate = 1; // Speed of speech (1 is normal)
      utterance.pitch = 1; // Pitch of speech (1 is normal)
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser.');
    }
  };

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

      speak(aiResponse);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    }
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