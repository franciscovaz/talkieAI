import axios from 'axios';

const API_URL = 'http://localhost:5001/api/chat';

export const sendMessageToAI = async (message: string) => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw error;
  }
};