import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
      <List>
        {messages.map((message) => (
          <ListItem
            key={message.id}
            sx={{
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                bgcolor: message.sender === 'user' ? '#1976d2' : '#f5f5f5',
                color: message.sender === 'user' ? '#fff' : '#000',
                borderRadius: 2,
                p: 1.5,
                maxWidth: '70%',
              }}
            >
              <ListItemText primary={message.text} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;