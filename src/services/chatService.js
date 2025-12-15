import api from './api';

export const askChatBot = (question) => {
    return api.post('/chat/ask', { question });
};
