
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OAuthCallback = () => {
  const location = useLocation();
  const [status, setStatus] = useState("Signing you in...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("error")) {
      setStatus(`Login failed: ${params.get("error")}`);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

      return;
    }

    // The backend has already created the Express session.
    // The browser should have received the seekvialove.sid cookie.
    //
    // Do NOT store sessionID/token in sessionStorage.
    // Axios will automatically send the session cookie because
    // withCredentials: true is enabled.

    const redirectTo =
      sessionStorage.getItem("redirectAfterLogin") || "/";

    sessionStorage.removeItem("redirectAfterLogin");

    // Reload the application so Navbar/ProtectedRoute can
    // call /v1/checkSession using the new session cookie.
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

