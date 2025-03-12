const url = 'https://ai-chatbot-server-phi.vercel.app/';
// const url = 'http://localhost:5000/';

import axios from "axios";

export const api = axios.create({
  baseURL: url,
});




