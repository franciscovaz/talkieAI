import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

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
        {messages.map((message, index) => (
          <ListItem
            key={message.id}
            sx={{
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
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
            </motion.div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;