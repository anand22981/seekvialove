import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

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

    // The backend has already created the Express session via the Google
    // callback redirect. The browser should have received the seekvialove.sid
    // cookie, but in incognito/private mode third-party cookies may be blocked.
    //
    // Poll /v1/checkSession to capture the sessionID via the X-Session-Id
    // response header. The axios response interceptor will persist it to
    // sessionStorage automatically.
    let cancelled = false;

    const pollSession = async () => {
      try {
        const res = await api.get("/v1/checkSession");
        if (!cancelled && res.data?.loggedIn) {
          setStatus("Signed in successfully...");
          // sessionID is already persisted by the axios response interceptor
        }
      } catch (err) {
        // Session may not be ready yet; retry
        if (!cancelled) {
          setTimeout(pollSession, 300);
        }
      }
    };

    pollSession();

    // Fallback: after a short delay, redirect even if polling failed.
    // The session cookie may still arrive (non-incognito flows).
    setTimeout(() => {
      if (!cancelled) {
        window.location.href =
          sessionStorage.getItem("redirectAfterLogin") || "/";
        sessionStorage.removeItem("redirectAfterLogin");
      }
    }, 3000);

    return () => {
      cancelled = true;
    };
  }, [location.search]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6" />

      <p className="text-gray-400">{status}</p>
    </div>
  );
};

export default OAuthCallback;

