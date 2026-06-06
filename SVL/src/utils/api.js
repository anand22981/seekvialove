import axios from 'axios';

const API = "http://3.213.27.192:7777";

const api = axios.create({
  baseURL: API,
});

// Attach session ID from sessionStorage to every request
api.interceptors.request.use((config) => {
  const sessionID = sessionStorage.getItem("sessionID");
  if (sessionID) {
    config.headers["X-Session-Id"] = sessionID;
  }
  return config;
});

export default api;
export { API };