import axios from 'axios';

const API = "https://api-seekvialove.onrender.com";

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

// Attach session ID from sessionStorage to every request.
// This is the fallback for incognito/private mode where the
// seekvialove.sid cookie gets blocked as a third-party cookie.
api.interceptors.request.use((config) => {
  const sessionID = sessionStorage.getItem("sessionID");
  if (sessionID) {
    config.headers["X-Session-Id"] = sessionID;
  }
  return config;
});

// After login/OAuth, persist sessionID from response/header
// so subsequent requests can use the header fallback.
api.interceptors.response.use((response) => {
  const sessionID =
    response.data?.sessionID ||
    response.headers["x-session-id"] ||
    null;
  if (sessionID) {
    sessionStorage.setItem("sessionID", sessionID);
  }
  return response;
});

export default api;
export { API };