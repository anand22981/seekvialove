import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import api from "../utils/api";

/* ─────────── reusable helper components ─────────── */

const Spinner = () => (
  <div className="flex items-center justify-center h-64">
    <motion.div
      className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <td key={i} className="p-4">
        <div className="h-4 bg-white/10 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const CountUp = ({ value, duration = 2 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const start = performance.now();
    const animate = (now) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);
  return <span>{display}</span>;
};

const StatCard = ({ label, value, icon, gradient, sub }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03, y: -5 }}
    className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl backdrop-blur-md bg-gradient-to-br ${gradient} transition-all duration-300 hover:shadow-2xl`}
  >
    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />
    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium opacity-75">{label}</p>
        <p className="text-3xl font-bold mt-1">
          <CountUp value={value} />
        </p>
        {sub && <p className="text-xs mt-1 opacity-70">{sub}</p>}
      </div>
      <motion.span
        className="text-4xl opacity-80"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {icon}
      </motion.span>
    </div>
  </motion.div>
);

const EmptyState = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-16 text-white/60"
  >
    <span className="text-6xl mb-4">{icon}</span>
    <p className="text-xl font-semibold">{title}</p>
    <p className="text-sm mt-1">{description}</p>
  </motion.div>
);

/* ─────────── main component ─────────── */

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/v1/admin/bookings");
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        const [bookingRes, reviewRes] = await Promise.all([
          api.get("/v1/admin/bookings"),
          api.get("/v1/admin/reviews"),
        ]);
        if (cancelled) return;
        setBookings(bookingRes.data.data || []);
        setReviews(reviewRes.data.data || []);
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setReviews([]);
      }
      if (!cancelled) {
        setLastRefreshed(new Date().toLocaleTimeString());
        setLoading(false);
      }
    };
    init();
    return () => { cancelled = true; };
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [bookingRes, reviewRes] = await Promise.all([
        api.get("/v1/admin/bookings"),
        api.get("/v1/admin/reviews"),
      ]);
      setBookings(bookingRes.data.data || []);
      setReviews(reviewRes.data.data || []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    }
    setLastRefreshed(new Date().toLocaleTimeString());
    setLoading(false);
  };

  const markCompleted = async (id) => {
    try {
      await api.patch(`/v1/admin/booking/complete/${id}`);
      alert("✅ Booking marked as completed");
      fetchBookings();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update booking");
    }
  };

  const handleSignOut = async () => {
    try {
      await api.post("/v1/logout");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Failed to sign out");
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    try {
      await api.delete(`/v1/admin/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete review");
    }
  };

  const totalBookings = bookings.length;
  const completed = bookings.filter((b) => b.isCompleted).length;
  const pending = totalBookings - completed;
  const completionRate = totalBookings > 0 ? Math.round((completed / totalBookings) * 100) : 0;

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 p-4 md:p-8 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-24">
        {/* ────────── HEADER ────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
              ⚡ Admin Dashboard
            </h1>
            {lastRefreshed && (
              <p className="text-white/40 text-sm mt-1">
                Last refreshed · {lastRefreshed}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md text-red-300 px-5 py-2.5 rounded-xl border border-red-500/30 transition-all duration-200 shadow-lg font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadDashboard}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-xl border border-white/10 transition-all duration-200 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* ────────── STAT CARDS ────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Bookings" value={totalBookings} icon="📅" gradient="from-purple-600 to-purple-900" />
          <StatCard label="Completed" value={completed} icon="✅" gradient="from-emerald-600 to-emerald-900" sub={`${completionRate}% rate`} />
          <StatCard label="Pending" value={pending} icon="⏳" gradient="from-amber-600 to-amber-900" />
          <StatCard label="Total Reviews" value={reviews.length} icon="💬" gradient="from-pink-600 to-pink-900" />
        </div>

        {/* ────────── BOOKINGS SECTION ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 shadow-2xl mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-bold text-white">Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <EmptyState icon="📭" title="No bookings yet" description="Bookings will appear here once users start purchasing." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs">
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">Service</th>
                    <th className="text-left p-3 font-medium">Price</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-center p-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, index) => (
                    <motion.tr
                      key={b._id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                            {(b.user?.emailId || "U").charAt(0).toUpperCase()}
                          </div>
                          <span className="truncate max-w-[140px]">{b.user?.emailId || "N/A"}</span>
                        </div>
                      </td>
                      <td className="p-3 font-medium">{b.service?.title || "Service"}</td>
                      <td className="p-3">₹ {b.service?.price?.toLocaleString() || 0}</td>
                      <td className="p-3">
                        {b.isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {!b.isCompleted && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => markCompleted(b._id)}
                            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white text-xs font-semibold shadow-lg hover:shadow-emerald-500/30 transition-all duration-200"
                          >
                            ✓ Complete
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* ────────── REVIEWS SECTION ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">💬</span>
            <h2 className="text-2xl font-bold text-white">User Reviews</h2>
          </div>

          {reviews.length === 0 ? (
            <EmptyState icon="🤫" title="No reviews yet" description="Reviews will appear here once users leave feedback." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs">
                    <th className="text-left p-3 font-medium">Name / Email</th>
                    <th className="text-left p-3 font-medium">Service</th>
                    <th className="text-left p-3 font-medium">Rating</th>
                    <th className="text-left p-3 font-medium">Mode</th>
                    <th className="text-left p-3 font-medium">Message</th>
                    <th className="text-center p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reviews) &&
                    reviews.map((r, index) => (
                      <motion.tr
                        key={r._id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-xs font-bold text-white">
                              {(r.user?.firstName || r.name || "R").charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span>{r.user?.firstName || r.name || "Anonymous"}</span>
                              {r.user?.emailId && <div className="text-xs text-white/50">{r.user.emailId}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm">
                          {r.service?.title || <span className="font-mono text-xs text-white/50">{r.service?._id?.slice(-6) || "—"}</span>}
                        </td>
                        <td className="p-3">
                          <span className="text-yellow-400 text-sm">{"⭐".repeat(r.rating)}</span>
                        </td>
                        <td className="p-3">
                          {r.mode === "Chat" ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium">💬 Chat</span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium">🎧 Audio</span>
                          )}
                        </td>
                        <td className="p-3 max-w-[200px] truncate text-white/80">{r.message}</td>
                        <td className="p-3 text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => deleteReview(r._id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500/40 transition-all duration-200"
                          >
                            🗑 Delete
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;