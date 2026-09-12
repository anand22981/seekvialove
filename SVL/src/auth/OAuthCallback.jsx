import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles the return (callback) from the Google OAuth flow.
 *
 * The backend (https://api-seekvialove.onrender.com) redirects the browser here.
 * We read any session identifier included in the query string
 * (sessionID / sessionId / token) and store it in sessionStorage so the
 * api interceptor can send it as the `X-Session-Id` header on later calls.
 *
 * If no identifier is present in the URL, we fall back to the session cookie
 * (sent automatically with `withCredentials`), which works once the backend
 * sets `SameSite=None; Secure` + CORS credentials headers.
 */
const OAuthCallback = () => {
  const location = useLocation();
  const [status, setStatus] = useState("Signing you in...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const sessionID =
      params.get("sessionID") ||
      params.get("sessionId") ||
      params.get("session_id") ||
      params.get("token");

    if (params.get("error")) {
      setStatus(`Login failed: ${params.get("error")}`);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    if (sessionID) {
      sessionStorage.setItem("sessionID", sessionID);
    }

    // Preserve any pre-login destination (set by Protectedroute).
    const redirectTo =
      sessionStorage.getItem("redirectAfterLogin") || "/";
    sessionStorage.removeItem("redirectAfterLogin");

    // Full reload so Navbar / Protectedroute / Profile all re-mount and
    // re-run checkSession with the now-available session.
    window.location.href = redirectTo;
  }, [location.search]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6" />
      <p className="text-gray-400">{status}</p>
    </div>
  );
};

export default OAuthCallback;