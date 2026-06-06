import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

const CountUp = ({ value, duration = 2 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) return;
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

const StatCard = ({ label, value, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="glass p-8 rounded-2xl text-center border border-yellow-500/10"
  >
    <span className="text-4xl mb-3 block">{icon}</span>
    <p className="text-4xl font-bold text-yellow-400 mb-1">
      <CountUp value={value} />+
    </p>
    <p className="text-gray-400 text-sm">{label}</p>
  </motion.div>
);

const About = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/v1/serviceList").then((res) => {
      setServices(res.data || []);
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-44 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="animate-gradient-text">About SeekViaLove</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Welcome to <strong className="text-yellow-400">SeekViaLove</strong> — a sacred space where ancient tarot wisdom meets modern soul guidance.
            </motion.p>
          </motion.div>
        </section>

        {/* Reader Story */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-64 h-64 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-6xl">
                  🔮
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-4 font-[Cinzel]">
                Meet the Reader
              </h2>
              <h3 className="text-xl font-semibold mb-2">Anisha Jha</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I am an intuitive tarot reader and soul guide with years of experience helping
                individuals navigate life's uncertainties. My journey with tarot began as a personal
                quest for clarity, which blossomed into a profound calling to serve others.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every reading is a sacred conversation between you, the cards, and the universe.
                My approach is compassionate, non-judgmental, and deeply intuitive — blending
                traditional tarot wisdom with energy-based guidance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard label="Readings Done" value={500} icon="🃏" />
            <StatCard label="Happy Clients" value={200} icon="💖" />
            <StatCard label="Years Experience" value={5} icon="✨" />
            <StatCard label="Services Offered" value={services.length || 8} icon="🔮" />
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-3xl border border-yellow-500/10 text-center"
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-6 font-[Cinzel]">
                🌟 Our Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                To empower individuals with clarity, confidence, and spiritual insight through
                compassionate tarot readings. We believe everyone deserves access to guidance
                that illuminates their path and helps them make empowered choices.
              </p>
              <div className="flex justify-center gap-8 mt-8 text-sm text-gray-400">
                <span>✨ Non-judgmental</span>
                <span>🔒 Confidential</span>
                <span>💫 Soul-led</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Offered */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-12"
            >
              <span className="animate-gradient-text">What We Offer</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🃏", title: "Tarot Readings", desc: "Deep intuitive card readings for love, career, and life decisions." },
                { icon: "💫", title: "Soul Guidance", desc: "Energy-based coaching to align you with your highest path." },
                { icon: "🌙", title: "Relationship Clarity", desc: "Insights into relationship dynamics and personal connections." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="glass p-8 rounded-2xl border border-white/10 text-center"
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;