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
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: '#fafafa' }}>
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
                bgcolor: message.sender === 'user' ? '#1976d2' : '#e0e0e0',
                color: message.sender === 'user' ? '#fff' : '#000',
                borderRadius: 2,
                p: 1.5,
                maxWidth: '70%',
                wordWrap: 'break-word',
                boxShadow: 1,
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