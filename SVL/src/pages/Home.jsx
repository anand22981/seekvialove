import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import img from "../assets/Desktop_wall.jpg";
import Footer from "../components/Footer";
import api from "../utils/api";

// ─── Generate static star positions ───
const generateStars = () =>
  Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

const STAR_DATA = generateStars();

// ─── Generate floating orbs ───
const ORB_DATA = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  left: `${15 + i * 14}%`,
  top: `${20 + Math.random() * 60}%`,
  size: 100 + Math.random() * 200,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 12,
  color: i % 2 === 0
    ? "from-purple-600/20 via-pink-600/10 to-transparent"
    : "from-yellow-500/15 via-orange-500/10 to-transparent",
}));

// ─── Floating Orbs Background ───
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
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -20, 40, 0],
          y: [0, -40, 20, -30, 0],
          scale: [1, 1.2, 0.9, 1.1, 1],
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

// ─── Shooting Stars ───
const ShootingStars = () => {
  // Stable random values - computed once with a deterministic seed
  const [stars] = useState(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      top: `${5 + Math.random() * 30}%`,
      left: `${60 + Math.random() * 40}%`,
      delay: 5 + i * 8,
      duration: 2 + Math.random(),
    }))
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[2]">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ top: s.top, left: s.left }}
          animate={{
            x: [0, -300],
            y: [0, 200],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Tail */}
          <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-white/80 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
};

// ─── Stars Background ───
const StarsBackground = () => (
  <div className="stars-container" aria-hidden="true">
    {STAR_DATA.map((s) => (
      <motion.div
        key={s.id}
        className="star"
        style={{
          left: s.left,
          top: s.top,
          width: s.size,
          height: s.size,
        }}
        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
        transition={{
          duration: s.duration,
          delay: s.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// ─── Section Divider ───
const MysticalDivider = () => (
  <div className="relative flex items-center justify-center py-8">
    <div className="w-1/4 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
    <div className="mx-4 flex items-center gap-2">
      <motion.span
        className="text-2xl"
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✦
      </motion.span>
      <motion.span
        className="text-xl text-purple-400"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ◇
      </motion.span>
      <motion.span
        className="text-2xl"
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        ✦
      </motion.span>
    </div>
    <div className="w-1/4 h-px bg-gradient-to-l from-transparent via-yellow-400/50 to-transparent" />
  </div>
);

// ─── Floating Tarot Emojis ───
const FloatingEmojis = () => {
  const emojis = ["🃏", "🔮", "✨", "🌙", "⭐", "🕯️", "💫", "🌌"];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {emojis.map((emoji, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl opacity-[0.08]"
          style={{
            left: `${5 + i * 12}%`,
            top: `${10 + (i % 4) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 6 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Service Card ───
const ServiceCard = ({ service, index, handleBookNow }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="tarot-card"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`tarot-card-inner w-full max-w-sm mx-auto rounded-2xl min-h-[400px] ${flipped ? "flipped" : ""}`}>
      {/* Front */}
      <div className="tarot-card-front w-full p-6 rounded-2xl bg-gradient-to-b from-black/90 via-purple-950/90 to-black/90 backdrop-blur-md border border-yellow-500/20 shadow-2xl text-white before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-yellow-400/5 before:to-transparent before:pointer-events-none overflow-hidden">
        <div className="relative z-10">
          <motion.div
            className="text-center text-5xl mb-4"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🃏
          </motion.div>
          {/* Glow line under icon */}
          <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400/80 via-purple-500/80 to-yellow-400/80 mx-auto mb-4 rounded-full" />
          <h3 className="text-xl font-bold mb-3 text-yellow-400 text-center font-[Cinzel] tracking-wide">
            {service.title}
          </h3>
          <p className="mb-4 text-sm text-gray-300 text-center leading-relaxed">{service.description}</p>
          <div className="space-y-2 text-sm mb-4 bg-black/30 rounded-xl p-3 border border-yellow-500/10">
            <p className="flex items-center gap-2">
              <span className="text-yellow-400">✦</span>
              <strong className="text-yellow-300">Ideal for:</strong>
              <span className="text-gray-300">{service.ideal}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-yellow-400">✦</span>
              <strong className="text-yellow-300">Mode:</strong>
              <span className="text-gray-300">{service.mode}</span>
            </p>
          </div>
          <div className="text-center mb-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              ₹{new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(service.price).replace("₹", "")}
            </span>
          </div>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(234,179,8,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-3 rounded-full font-bold shadow-lg relative overflow-hidden group"
              onClick={() => handleBookNow(service)}
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Back - Tarot Card Back Design */}
      <div className="tarot-card-back absolute inset-0 w-full p-6 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-black border border-yellow-500/30 shadow-2xl flex flex-col items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-yellow-400/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-yellow-400/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-yellow-400/10 rounded-full" />
        </div>
        <motion.span
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🔮
        </motion.span>
        <p className="text-center text-sm italic text-yellow-200 font-[Cinzel]">
          "The cards reveal your path..."
        </p>
        <p className="text-xs mt-4 text-gray-400">{service.title}</p>
        <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />
      </div>
    </div>
  </motion.div>
  );
};

// ─── Review Card ───
const ReviewCard = ({ review, getReviewerName }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    className="min-w-[320px] bg-gradient-to-br from-black/90 via-purple-950/80 to-black/90
      backdrop-blur-md border border-yellow-500/20 shadow-xl rounded-2xl p-5 text-white
      relative overflow-hidden group"
  >
    {/* Glow on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
            {getReviewerName(review).charAt(0).toUpperCase()}
          </div>
          <h3 className="font-semibold text-yellow-300">{getReviewerName(review)}</h3>
        </div>
        <span className="text-yellow-400 text-sm">
          {"⭐".repeat(review.rating || 5)}
        </span>
      </div>
      <div className="mt-3 relative">
        <span className="absolute -top-2 -left-1 text-4xl text-yellow-400/10 leading-none">"</span>
        <p className="text-sm text-gray-300 italic pl-3 leading-relaxed">"{review.message}"</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-gray-500">Mode:</span>
        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 text-xs border border-purple-500/20">
          {review.mode === "Chat" ? "💬 Chat" : "🎧 Audio"}
        </span>
      </div>
    </div>
  </motion.div>
);

// ─── How It Works Step ───
const HowItWorksCard = ({ step, icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="relative"
  >
    {/* Connecting line */}
    {index < 3 && (
      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400/30 to-transparent z-0" />
    )}
    <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-black/60 via-purple-950/40 to-black/60 backdrop-blur-sm border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-500">
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 via-purple-600/20 to-pink-500/20 flex items-center justify-center text-3xl border border-yellow-400/30 mb-4"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </motion.div>
      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg">
        {index + 1}
      </div>
      <h3 className="text-lg font-bold text-yellow-400 mb-2 font-[Cinzel]">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─── Stats Counter ───
const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Readings Done", icon: "🔮" },
    { value: "50+", label: "Happy Clients", icon: "💖" },
    { value: "5★", label: "Average Rating", icon: "⭐" },
    { value: "4+", label: "Years Experience", icon: "🕯️" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl bg-gradient-to-b from-black/60 via-purple-950/30 to-black/60 backdrop-blur-sm border border-yellow-500/10 text-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <motion.span
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent block"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-sm text-gray-400 mt-1 block">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FAQ Item ───
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border border-yellow-500/10 rounded-xl overflow-hidden backdrop-blur-sm bg-gradient-to-r from-black/60 via-purple-950/30 to-black/60"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:bg-yellow-400/5 transition-colors"
      >
        <span className="font-medium text-yellow-300">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-yellow-400 text-xl flex-shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

// ─── FAQ Data ───
const faqData = [
  {
    question: "What is a tarot reading?",
    answer: "A tarot reading uses a deck of cards to gain insight into your past, present, and future. Each card carries symbolic meaning that helps guide you toward clarity and understanding.",
  },
  {
    question: "How should I prepare for a session?",
    answer: "Find a quiet space, take a few deep breaths, and come with an open mind. Have your questions ready — the clearer you are, the more guidance the cards can reveal.",
  },
  {
    question: "Is online reading as effective?",
    answer: "Absolutely! Energy transcends physical distance. Online readings are just as powerful and accurate as in-person sessions. Many find them more comfortable and convenient.",
  },
  {
    question: "What kind of questions can I ask?",
    answer: "You can ask about love, career, personal growth, relationships, or any area where you seek clarity. Avoid yes/no questions — open-ended questions yield the most insightful guidance.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceRes, reviewRes] = await Promise.all([
          api.get("/v1/serviceList"),
          api.get("/v1/reviews"),
        ]);

        setServices(serviceRes.data);

        const reviewsData = reviewRes.data?.data || reviewRes.data || [];
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setReviews([]);
      }
    };
    fetchData();
  }, []);

  const handleBookNow = (service) => {
    sessionStorage.setItem("pendingBookingService", JSON.stringify(service));
    navigate("/booking", { state: { service } });
  };

  const getReviewerName = (review) => {
    return review.name || review.user?.firstName || "Anonymous";
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cosmic Background Layers */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/40 via-black/80 to-black pointer-events-none z-0" />
      
      {/* Background Image with Parallax Feel */}
      <motion.div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${img})` }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Shooting Stars */}
      <ShootingStars />

      {/* Floating Tarot Emojis */}
      <FloatingEmojis />

      {/* Floating Stars */}
      <StarsBackground />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* ─── HERO SECTION ─── */}
        <section className="min-h-screen pt-28 md:pt-36 lg:pt-44 flex items-center justify-center relative">
          {/* Decorative radial gradient behind hero */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 border border-yellow-400/20 rounded-full" />
              <div className="absolute -bottom-5 -right-5 w-14 h-14 border border-purple-400/20 rounded-full" />
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl leading-tight">
                <span className="animate-gradient-text">Seek Via Love</span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-3 font-[Cinzel] tracking-wider text-gray-300">
                  Tarot & Soul Guidance
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-6 text-gray-400 text-sm md:text-base leading-relaxed max-w-md"
              >
                Unlock the mysteries of your soul through ancient wisdom. 
                Every card holds a story — let yours be revealed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8 flex gap-4"
              >
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-3 rounded-full font-bold shadow-lg relative overflow-hidden group"
                    animate={{ boxShadow: ["0 0 10px rgba(234,179,8,0.3)", "0 0 25px rgba(234,179,8,0.6)", "0 0 10px rgba(234,179,8,0.3)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="relative z-10">Explore Services</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.a>
                <motion.a
                  href="#faq"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="px-8 py-3 rounded-full font-semibold text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/10 transition-all duration-300">
                    Learn More
                  </button>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-sm mx-auto"
            >
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/10 via-purple-600/10 to-pink-500/10 rounded-2xl blur-xl" />
                <div className="relative rounded-xl glass p-6 text-white border border-yellow-500/20 overflow-hidden">
                  {/* Decorative patterns */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/5 to-transparent rounded-bl-full" />
                  
                  <motion.h1
                    className="text-lg font-bold mb-2 text-yellow-400 font-[Cinzel] tracking-wide"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    About Reader
                  </motion.h1>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-purple-500 mb-4 rounded-full" />
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">
                    When life feels confusing, the cards speak clarity. I am{" "}
                    <strong className="text-yellow-300">Anisha Jha</strong> — an intuitive tarot reader and soul guide.
                    I guide you toward understanding, healing, and empowered choices.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {[
                      { icon: "✨", text: "Non-judgmental" },
                      { icon: "💫", text: "Confidential & compassionate" },
                      { icon: "🌙", text: "Energy-based, soul-led readings" },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                        className="flex items-center gap-2 text-gray-300 text-sm"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.a
                    href="#services"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block"
                  >
                    <motion.button
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold w-full shadow-lg relative overflow-hidden group"
                      animate={{ boxShadow: ["0 0 10px rgba(239,68,68,0.3)", "0 0 25px rgba(239,68,68,0.6)", "0 0 10px rgba(239,68,68,0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="relative z-10">👉 Book a Reading</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <MysticalDivider />

        {/* ─── STATS SECTION ─── */}
        <StatsSection />

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="animate-gradient-text">How It Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Your journey to clarity in four simple steps
          </motion.p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🔮", title: "Choose Your Reading", description: "Browse our tarot services and pick the one that resonates with your needs." },
              { icon: "📅", title: "Book Your Session", description: "Select your preferred date and time for a personalized session." },
              { icon: "💬", title: "Connect & Explore", description: "Join via chat or audio call and open your heart to the cards." },
              { icon: "✨", title: "Receive Guidance", description: "Walk away with clarity, insights, and a renewed sense of direction." },
            ].map((step, i) => (
              <HowItWorksCard key={i} {...step} index={i} />
            ))}
          </div>
        </section>

        <MysticalDivider />

        {/* ─── SERVICES SECTION ─── */}
        <section id="services" className="pt-16 pb-20 px-6 scroll-mt-40">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="animate-gradient-text">🃏 Tarot Readings & Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Each reading is a unique journey tailored to your energy and questions
          </motion.p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((serviceItem, index) => (
              <ServiceCard
                key={serviceItem._id}
                service={serviceItem}
                index={index}
                handleBookNow={handleBookNow}
              />
            ))}
          </div>
        </section>

        <MysticalDivider />

        {/* ─── SOUL STORIES ─── */}
        <section className="text-center py-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="animate-gradient-text">💖 Soul Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 mb-4"
          >
            Real experiences from our happy clients ✨
          </motion.p>

          {reviews.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500 mt-8 text-sm"
            >
              No stories yet. Be the first to share your experience! ✨
            </motion.p>
          ) : (
            <div className="relative overflow-hidden mt-8">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

              <div className="flex gap-6 animate-scroll">
                {[...reviews, ...reviews].map((review, index) => (
                  <ReviewCard
                    key={index}
                    review={review}
                    getReviewerName={getReviewerName}
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA within reviews */}
          {reviews.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-500 mt-8 text-sm"
            >
              Share your story after your reading! 🌟
            </motion.p>
          )}
        </section>

        <MysticalDivider />

        {/* ─── FAQ SECTION ─── */}
        <section id="faq" className="py-16 px-6 scroll-mt-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="animate-gradient-text">❓ Frequently Asked Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mb-10"
          >
            Everything you need to know before your reading
          </motion.p>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem key={index} {...faq} index={index} />
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA SECTION ─── */}
        <section className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center relative"
          >
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-yellow-400/5 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-purple-400/5 rounded-full" />
            
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <span className="animate-gradient-text">Ready to Discover Your Path?</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 mb-8 text-lg max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The universe is speaking. Are you ready to listen? 
              Book your tarot reading today and unlock the wisdom within.
            </motion.p>
            <motion.a href="#services" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.button
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl relative overflow-hidden group"
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(234,179,8,0.3), 0 0 30px rgba(234,179,8,0.1)",
                    "0 0 25px rgba(234,179,8,0.6), 0 0 50px rgba(234,179,8,0.2)",
                    "0 0 15px rgba(234,179,8,0.3), 0 0 30px rgba(234,179,8,0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="relative z-10">✨ Begin Your Journey</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.a>
          </motion.div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;