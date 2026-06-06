import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Img from "../assets/Desktop_wall.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!firstName || !email || !password) {
      alert("First name, email, and password are required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        firstName,
        lastName,
        emailId: email,
        password,
        ...(dob && { dob }),
        ...(gender && { gender }),
        ...(birthPlace && { birthPlace }),
        ...(birthTime && { birthTime }),
      };

      const res = await api.post(
        "/v1/signup",
        payload,
        { withCredentials: true }
      );

      if (res.data.message === "User added successfully") {
        alert("Account created! Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${Img})` }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-black/80 to-black pointer-events-none" />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pt-28">
        <Navbar />

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-md"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-yellow-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
          
          <div className="relative glass p-8 rounded-2xl text-white border border-white/10 shadow-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-6 text-yellow-400 font-[Cinzel]"
            >
              ✨ Join SeekViaLove
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-1/2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-1/2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
              />
              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
              />
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500 [color-scheme:dark]"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition [color-scheme:dark]"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <input
                type="text"
                placeholder="Birth Place"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
              />
              <div className="flex gap-3 items-end">
                <div className="w-1/2">
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Birth Time</label>
                  <input
                    type="time"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition [color-scheme:dark]"
                  />
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignup}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg"
              disabled={loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Creating Account...
                </span>
              ) : (
                "✨ Create Account"
              )}
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-gray-400"
            >
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 font-semibold hover:text-yellow-300 transition">
                Login
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;