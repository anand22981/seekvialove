import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthTime, setBirthTime] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/v1/profile");
        if (res.data.success) {
          const user = res.data.data;
          setProfile(user);
          setFirstName(user.firstName || "");
          setLastName(user.lastName || "");
          setEmail(user.emailId || "");
          setDob(user.dob ? user.dob.split("T")[0] : "");
          setGender(user.gender || "");
          setBirthPlace(user.birthPlace || "");
          setBirthTime(user.birthTime || "");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!firstName.trim()) {
      setMessage({ text: "First name is required", type: "error" });
      return;
    }

    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const payload = {
        firstName,
        lastName,
        ...(dob && { dob }),
        ...(gender && { gender }),
        ...(birthPlace && { birthPlace }),
        ...(birthTime && { birthTime }),
      };

      const res = await api.patch(`/v1/infoUpdate/${profile._id}`, payload);
      if (res.data.success) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        setProfile(res.data.data);
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to update profile",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/30 via-black/80 to-black pointer-events-none z-0" />

      <div className="relative z-10 pt-28 md:pt-36 pb-20">
        <Navbar />

        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            {/* Avatar */}
            <motion.div
              className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 p-1"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold text-yellow-400">
                {firstName.charAt(0).toUpperCase() || "?"}
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-white">
              <span className="animate-gradient-text">My Profile</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your account details</p>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-b from-black/90 via-purple-950/50 to-black/90 backdrop-blur-md border border-yellow-500/20 rounded-2xl p-5 sm:p-8 shadow-2xl"
          >
            {/* Success/Error Message */}
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-3 rounded-xl text-sm text-center ${
                  message.type === "success"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {message.type === "success" ? "✅ " : "❌ "}{message.text}
              </motion.div>
            )}

            <div className="space-y-5">
              {/* Name Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/2">
                  <label className="block text-xs text-gray-500 mb-1 ml-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl cursor-not-allowed"
                />
              </div>

              {/* DOB + Gender */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/2">
                  <label className="block text-xs text-gray-500 mb-1 ml-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition [color-scheme:dark]"
                  />
                </div>
                <div className="w-full sm:w-1/2">
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

              {/* Birth Place */}
              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Birth Place</label>
                <input
                  type="text"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  placeholder="e.g. Mumbai, India"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-600"
                />
              </div>

              {/* Birth Time */}
              <div>
                <label className="block text-xs text-gray-500 mb-1 ml-1">Birth Time</label>
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(234,179,8,0.3)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saving}
              className={`w-full mt-8 bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-6 py-3.5 rounded-xl font-bold shadow-lg transition-all ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                "💾 Save Changes"
              )}
            </motion.button>
          </motion.div>

          {/* Account Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
          >
            <p className="text-gray-500 text-xs">
              Member since {new Date(profile?.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;