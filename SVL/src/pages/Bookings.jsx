import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import img from "../assets/Desktop_wall.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

// ─── Floating Orbs ───
const ORB_DATA = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  left: `${10 + i * 20}%`,
  top: `${15 + Math.random() * 70}%`,
  size: 80 + Math.random() * 180,
  delay: Math.random() * 5,
  duration: 10 + Math.random() * 15,
  color: i % 2 === 0
    ? "from-purple-600/15 via-pink-600/8 to-transparent"
    : "from-yellow-500/10 via-orange-500/8 to-transparent",
}));

const FloatingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
    {ORB_DATA.map((orb) => (
      <motion.div
        key={orb.id}
        className={`absolute rounded-full bg-gradient-to-br ${orb.color}`}
        style={{
          left: orb.left,
          top: orb.top,
          width: orb.size,
          height: orb.size,
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 25, -15, 35, 0],
          y: [0, -30, 15, -25, 0],
          scale: [1, 1.15, 0.95, 1.1, 1],
        }}
        transition={{
          duration: orb.duration,
          delay: orb.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// ─── Floating Mystical Symbols ───
const MysticalSymbols = () => {
  const symbols = ["✦", "◇", "○", "✧", "♱", "∞", "☽", "☆"];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {symbols.map((sym, i) => (
        <motion.div
          key={i}
          className="absolute text-lg md:text-xl opacity-[0.04]"
          style={{
            left: `${5 + i * 11}%`,
            top: `${8 + (i % 5) * 20}%`,
            color: "#f59e0b",
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 7 + i,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {sym}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Spinner ───
const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="relative">
      <motion.div
        className="w-14 h-14 border-4 border-yellow-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 w-14 h-14 border-4 border-purple-500 border-b-transparent rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

// ─── Status Badge ───
const StatusBadge = ({ isCompleted }) => (
  isCompleted ? (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 shadow-lg shadow-emerald-500/10"
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-emerald-400"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      Completed
    </motion.span>
  ) : (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 shadow-lg shadow-amber-500/10"
    >
      <motion.span
        className="w-2 h-2 rounded-full bg-amber-400"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      Pending
    </motion.span>
  )
);

// ─── Empty State ───
const EmptyBookings = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="relative mb-6">
      <motion.div
        className="text-7xl"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🃏
      </motion.div>
      <motion.div
        className="absolute -top-2 -right-2 text-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.div>
    </div>
    <h3 className="text-2xl font-bold text-yellow-400 mb-2 font-[Cinzel]">No Readings Yet</h3>
    <p className="text-gray-500 max-w-sm">
      Your mystical journey awaits. Book a tarot reading to unlock the wisdom of the cards.
    </p>
    <motion.a
      href="/"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-3 rounded-full font-bold shadow-lg"
    >
      ✦ Explore Services
    </motion.a>
  </motion.div>
);

// ─── Booking Card ───
const BookingCard = ({ booking, reviewMap, openEditReview, openNewReview, deleteReview, index }) => {
  const [flipped, setFlipped] = useState(false);
  const bookedService = booking.service;
  const bookedAt = new Date(booking.createdAt).toLocaleString();
  const reviewData = reviewMap[bookedService?._id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="tarot-card"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`tarot-card-inner w-full max-w-sm mx-auto rounded-2xl min-h-[420px] ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="tarot-card-front w-full p-6 rounded-2xl bg-gradient-to-b from-black/90 via-purple-950/80 to-black/90 backdrop-blur-md border border-yellow-500/20 shadow-2xl text-white overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500/20 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-yellow-500/20 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-yellow-500/20 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500/20 rounded-br-2xl" />

          <div className="relative z-10">
            {/* Service Image */}
            <div className="relative mb-4 rounded-xl overflow-hidden">
              <img
                src={bookedService.image}
                alt={bookedService.title}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-3">
                <StatusBadge isCompleted={booking.isCompleted} />
              </div>
            </div>

            <h3 className="text-lg font-bold text-yellow-400 font-[Cinzel] mb-1">{bookedService.title}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                ₹{typeof bookedService.price === "number" ? bookedService.price.toLocaleString() : bookedService.price}
              </span>
              <span className="text-xs text-gray-500">{bookedAt}</span>
            </div>

            {/* Progress indicator */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full rounded-full ${booking.isCompleted ? "bg-emerald-500" : "bg-gradient-to-r from-yellow-500 to-orange-500"}`}
                initial={{ width: 0 }}
                animate={{ width: booking.isCompleted ? "100%" : "60%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>

            {booking.isCompleted && (
              <div className="flex gap-2 mt-2 w-full">
                {reviewData ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => { e.stopPropagation(); openEditReview(booking); }}
                      className="flex-1 bg-blue-600/80 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm border border-blue-500/20 hover:bg-blue-600 transition-all"
                    >
                      ✏️ Edit Review
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => { e.stopPropagation(); deleteReview(reviewData._id); }}
                      className="flex-1 bg-red-600/80 text-white px-3 py-2 rounded-xl text-xs font-medium backdrop-blur-sm border border-red-500/20 hover:bg-red-600 transition-all"
                    >
                      🗑 Delete
                    </motion.button>
                  </>
                ) : (
                  !booking.isReviewed && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => { e.stopPropagation(); openNewReview(booking); }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg"
                    >
                      💬 Give Review
                    </motion.button>
                  )
                )}
              </div>
            )}

            {booking.isReviewed && !reviewData && (
              <p className="text-emerald-400 text-xs text-center mt-2">✅ Review submitted</p>
            )}
          </div>
        </div>

        {/* Back - Mystical Tarot Design */}
        <div className="tarot-card-back absolute inset-0 w-full p-6 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-black border border-yellow-500/30 shadow-2xl flex flex-col items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-yellow-400/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-yellow-400/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-yellow-400/10 rounded-full" />
            {/* Star burst lines */}
            {[0, 45, 90, 135].map((angle) => (
              <div
                key={angle}
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-yellow-400/20 to-transparent"
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)`, transformOrigin: "center center" }}
              />
            ))}
          </div>
          <motion.span
            className="text-5xl mb-3"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🔮
          </motion.span>
          <p className="text-center text-sm italic text-yellow-200 font-[Cinzel] mb-2">
            "The universe speaks in whispers..."
          </p>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mb-2" />
          <p className="text-xs text-gray-400">{bookedService.title}</p>
          <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
};

// ─── Generate stable star positions for Review Modal ───
const MODAL_STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 7 + 3) % 100}%`,
  top: `${(i * 13 + 7) % 100}%`,
  duration: 2 + (i % 4),
  delay: (i * 0.7) % 4,
}));

// ─── Review Modal ───
const ReviewModal = ({ editingReview, reviewForm, setReviewForm, submitReview, closeReviewModal }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 px-4"
    onClick={closeReviewModal}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 40 }}
      onClick={(e) => e.stopPropagation()}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-950 to-black border border-yellow-500/20 p-8 rounded-2xl w-full max-w-md shadow-2xl"
    >
      {/* Stars background inside modal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {MODAL_STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: s.left,
              top: s.top,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.span
            className="text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {editingReview ? "✏️" : "💬"}
          </motion.span>
          <div>
            <h2 className="text-xl font-bold text-yellow-400 font-[Cinzel]">
              {editingReview ? "Refine Your Story" : "Share Your Experience"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {editingReview ? "Update your reading review" : "Your words guide others on their journey"}
            </p>
          </div>
        </div>

        <textarea
          placeholder="Describe how the reading impacted you..."
          className="w-full bg-white/5 border border-yellow-500/10 text-white p-4 mb-4 rounded-xl focus:outline-none focus:border-yellow-500/40 transition placeholder-gray-600 resize-none"
          rows={4}
          value={reviewForm.message}
          onChange={(e) => setReviewForm({ ...reviewForm, message: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-3 mb-6">
          <select
            className="w-full bg-white/5 border border-yellow-500/10 text-white p-3 rounded-xl focus:outline-none focus:border-yellow-500/40 transition text-sm"
            value={reviewForm.mode}
            onChange={(e) => setReviewForm({ ...reviewForm, mode: e.target.value })}
          >
            <option value="Chat">💬 Chat Session</option>
            <option value="Audio">🎧 Audio Session</option>
          </select>

          <select
            className="w-full bg-white/5 border border-yellow-500/10 text-white p-3 rounded-xl focus:outline-none focus:border-yellow-500/40 transition text-sm"
            value={reviewForm.rating}
            onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(234,179,8,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={submitReview}
          className="relative overflow-hidden group bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-4 py-3 rounded-xl w-full font-bold shadow-lg"
        >
          <span className="relative z-10">
            {editingReview ? "✨ Update Review" : "✨ Share Your Story"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <button
          onClick={closeReviewModal}
          className="mt-3 w-full text-gray-500 hover:text-gray-300 py-2 transition text-sm"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Main Component ───
const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [service, setService] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Review modal state
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    message: "",
    rating: 5,
    mode: "Chat",
  });
  const [existingReviews, setExistingReviews] = useState({});

  const submitReview = async () => {
    try {
      const payload = {
        serviceId: selectedBooking.service._id,
        message: reviewForm.message,
        rating: Number(reviewForm.rating),
        mode: reviewForm.mode,
      };

      if (editingReview) {
        await api.patch(`/v1/reviews/${editingReview._id}`, payload);
      } else {
        await api.post("/v1/reviews", payload);
      }

      setSelectedBooking(null);
      setEditingReview(null);
      await refreshBookings();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting review");
    }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await api.delete(`/v1/reviews/${reviewId}`);
      await refreshBookings();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error deleting review");
    }
  };

  const openEditReview = (booking) => {
    const review = existingReviews[booking.service._id];
    if (review) {
      setEditingReview(review);
      setSelectedBooking(booking);
      setReviewForm({
        message: review.message,
        rating: review.rating,
        mode: review.mode,
      });
    }
  };

  const openNewReview = (booking) => {
    setEditingReview(null);
    setSelectedBooking(booking);
    setReviewForm({ message: "", rating: 5, mode: "Chat" });
  };

  const closeReviewModal = () => {
    setSelectedBooking(null);
    setEditingReview(null);
  };

  const refreshBookings = async () => {
    try {
      const [bookingRes, reviewsRes] = await Promise.all([
        api.get("/v1/booking"),
        api.get("/v1/reviews"),
      ]);

      if (bookingRes.data.success) {
        setBookings(bookingRes.data.data);
      }

      const reviewsData = reviewsRes.data?.data || [];
      const reviewMap = {};
      reviewsData.forEach((r) => {
        if (r.service?._id) {
          reviewMap[r.service._id] = r;
        }
      });
      setExistingReviews(reviewMap);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-refresh on window focus/visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshBookings();
      }
    };

    const handleFocus = () => {
      refreshBookings();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Periodic polling as backup (every 60 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      refreshBookings();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initialize = async () => {
      try {
        const sessionRes = await api.get("/v1/checkSession");
        if (!sessionRes.data.loggedIn) {
          navigate("/login");
          return;
        }
        if (location.state?.service) {
          setService(location.state.service);
          sessionStorage.removeItem("pendingBookingService");
        } else {
          const pendingService = sessionStorage.getItem("pendingBookingService");
          if (pendingService) {
            try {
              const parsed = JSON.parse(pendingService);
              setService(parsed);
              sessionStorage.removeItem("pendingBookingService");
            } catch {
              // ignore parse errors
            }
          }
        }
        await refreshBookings();
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, [location.state, navigate]);

  if (loading) return <Spinner />;

  const generateUPILink = (service) => {
    const UPI_VPA = "7361015759@ybl";
    const UPI_NAME = "Anisha Jha";
    const UPI_AMOUNT = typeof service.price === "number"
      ? service.price
      : Number(service.price.toString().replace(/[₹\s]/g, ""));
    const UPI_NOTE = encodeURIComponent(service.title);
    return `upi://pay?pa=${UPI_VPA}&pn=${encodeURIComponent(UPI_NAME)}&am=${UPI_AMOUNT}&cu=INR&tn=${UPI_NOTE}`;
  };

  const handleBooking = async () => {
    if (!service) return;
    try {
      setBookingLoading(true);
      const res = await api.post("/v1/booking", { serviceId: service._id });
      if (res.data.success) {
        setBookings([res.data.data, ...bookings]);
        window.location.href = generateUPILink(service);
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${img})` }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/40 via-black/80 to-black pointer-events-none z-0" />

      {/* Decorative Layers */}
      <FloatingOrbs />
      <MysticalSymbols />

      <div className="relative z-10 pt-28 md:pt-36">
        <Navbar />

        {/* ─── NOTICE BANNER ─── */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black font-semibold p-5 text-center shadow-lg w-full relative overflow-hidden border-b-2 border-yellow-400/20"
        >
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <motion.span
              className="text-xl hidden sm:inline"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💳
            </motion.span>
            <p className="text-sm leading-relaxed">
              <span className="font-extrabold">Pay via UPI:</span>{' '}
              <button
                onClick={() => {
                  navigator.clipboard.writeText("7361015759@ybl");
                  alert("✅ UPI ID copied: 7361015759@ybl");
                }}
                className="font-bold underline underline-offset-2 hover:text-white transition cursor-pointer"
                title="Click to copy UPI ID"
              >
                7361015759@ybl
              </button>
              <span className="mx-2">|</span>
              <span className="font-extrabold">After Payment:</span> Send screenshot to{' '}
              <span className="font-bold underline underline-offset-2">anishakumarivats7@gmail.com</span>
            </p>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/20 text-xs font-bold">
              ⏱ 24 hrs
            </span>
          </div>
        </motion.div>

        {/* ─── SELECTED SERVICE BOOKING ─── */}
        <AnimatePresence>
          {service && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="flex mt-10 items-center justify-center px-4"
            >
              <div className="relative w-full max-w-md">
                {/* Glow behind card */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-yellow-500/30 via-purple-500/30 to-yellow-500/30 rounded-3xl blur-2xl"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-b from-black/90 via-purple-950/80 to-black/90 backdrop-blur-xl border border-yellow-500/20 shadow-2xl p-6 sm:p-8 rounded-2xl text-white overflow-hidden">
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-500/30 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-yellow-500/30 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-yellow-500/30 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-500/30 rounded-br-2xl" />
                  
                  {service.image && (
                    <div className="relative mb-5 rounded-xl overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 sm:h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs border border-yellow-500/30 backdrop-blur-sm">
                          {service.mode === "Chat" ? "💬 Chat" : "🎧 Audio"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 font-[Cinzel]">{service.title}</h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-full mt-2" />
                    </div>
                    <motion.span
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      🃏
                    </motion.span>
                  </div>

                  {service.description && (
                    <p className="text-sm text-gray-400 mt-3 leading-relaxed">{service.description}</p>
                  )}

                  {/* Service details */}
                  <div className="mt-4 space-y-2 bg-white/5 rounded-xl p-4 border border-yellow-500/10">
                    {service.ideal && (
                      <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-300">
                        <span className="text-yellow-400">✦</span>
                        <strong className="text-yellow-300">Ideal for:</strong> {service.ideal}
                      </p>
                    )}
                    {service.duration && (
                      <p className="text-xs sm:text-sm flex items-center gap-2 text-gray-300">
                        <span className="text-yellow-400">✦</span>
                        <strong className="text-yellow-300">Duration:</strong> {service.duration}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-5 mb-5">
                    <motion.span
                      className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent"
                      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      ₹{service.price?.toLocaleString()}
                    </motion.span>
                    <span className="text-xs text-gray-500">One-time payment</span>
                  </div>

                  <motion.button
                    onClick={handleBooking}
                    disabled={bookingLoading}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(234,179,8,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden group text-white bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-4 rounded-xl font-bold w-full text-lg shadow-2xl ${
                      bookingLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {bookingLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          🔮 Book This Reading
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── BOOKING HISTORY ─── */}
        <div className="max-w-6xl mx-auto mt-16 px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-2"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="animate-gradient-text">📋 Your Reading Journey</span>
            </motion.h2>
            <p className="text-gray-500 text-sm">Every card drawn is a step toward clarity</p>
          </motion.div>

          {/* Manual Refresh Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshBookings}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/10 transition-all duration-200 shadow-lg"
              title="Refresh booking status"
            >
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Status
            </motion.button>
          </motion.div>

          {bookings.length === 0 ? (
            <EmptyBookings />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookings.map((booking, index) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  reviewMap={existingReviews}
                  openEditReview={openEditReview}
                  openNewReview={openNewReview}
                  deleteReview={deleteReview}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* ─── REVIEW MODAL ─── */}
        <AnimatePresence>
          {selectedBooking && (
            <ReviewModal
              editingReview={editingReview}
              reviewForm={reviewForm}
              setReviewForm={setReviewForm}
              submitReview={submitReview}
              closeReviewModal={closeReviewModal}
            />
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </div>
  );
};

export default Booking;