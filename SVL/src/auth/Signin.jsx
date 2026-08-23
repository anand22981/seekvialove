import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "../assets/Desktop_wall.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from "../utils/api";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  

  const handleGoogleLogin = () => {
  window.location.href = "https://api-seekvialove.onrender.com/v1/auth/google";
};

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "/v1/signin",
        { emailId: email, password }
      );

      // Save sessionID so subsequent API calls use it via the interceptor
      if (res.data?.sessionID) {
        sessionStorage.setItem("sessionID", res.data.sessionID);
      }

      // Accept the response if loggedIn flag is true OR any success indicator is present
      const loggedIn = res.data?.loggedIn || res.data?.data?.loggedIn || false;
      const hasRole = !!res.data?.data?.role || !!res.data?.role;
      const hasSuccessMsg = (
        res.data?.message?.toLowerCase().includes("success") ||
        res.data?.data?.message?.toLowerCase().includes("success") ||
        res.data?.status === "success" ||
        res.data?.success === true
      );

      if (loggedIn || hasRole || hasSuccessMsg) {
        // Extract role safely - try multiple possible paths
        const role = res.data?.data?.role || res.data?.role || "user";
        let redirectTo = "/";
        if (role === "admin") {
          redirectTo = "/admin";
        } else {
          // Clear any stored redirect after using it
          redirectTo = sessionStorage.getItem("redirectAfterLogin") || "/";
          // Do NOT remove pendingBookingService here - the booking page
          // will read it and clean it up after successfully restoring the service
          sessionStorage.removeItem("redirectAfterLogin");
        }
        // Force full page reload so Navbar, Protectedroute, and all components
        // re-mount and properly detect the new session cookie
        window.location.href = redirectTo;
      } else {
        console.error("Unexpected login response:", res.data);
        alert("Login failed: unexpected server response. Check console for details.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${Img})` }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-black/80 to-black pointer-events-none" />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-28">
        <Navbar />

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-sm"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-yellow-500/10 rounded-3xl blur-2xl" />
          
          <div className="relative glass p-8 rounded-2xl text-white border border-white/10 shadow-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-6 text-yellow-400 font-[Cinzel]"
            >
              🔮 Login to SeekViaLove
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
              />
            </motion.div>

            <button
              onClick={handleLogin}
              className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-4 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-5 h-5 border-2 border-black border-t-transparent rounded-full inline-block animate-spin"
                  />
                  Logging in...
                </span>
              ) : (
                "🔮 Login"
              )}
            </button>

            <div className="flex items-center gap-3 my-6">
  <div className="flex-1 h-px bg-white/10"></div>
  <span className="text-gray-500 text-sm">OR</span>
  <div className="flex-1 h-px bg-white/10"></div>
</div>

<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full bg-white text-black px-4 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.92-4.2 2.92-7.4z"
    />
    <path
      fill="#34A853"
      d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.6z"
    />
    <path
      fill="#FBBC05"
      d="M6.54 13.69a5.86 5.86 0 0 1 0-3.38V7.79H3.3a9.75 9.75 0 0 0 0 8.42l3.24-2.52z"
    />
    <path
      fill="#EA4335"
      d="M12 6.28c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.35 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.7 5.39l3.24 2.52C7.31 8 9.46 6.28 12 6.28z"
    />
  </svg>

  Continue with Google
</button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-gray-400"
            >
              Don't have an account?{" "}
              <Link to="/signup" className="text-yellow-400 font-semibold hover:text-yellow-300 transition">
                Signup
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;