import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit - opens email client
    window.location.href = `mailto:anishakumarivats7@gmail.com?subject=SeekViaLove Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="pt-44 pb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="animate-gradient-text">Get in Touch</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have a question or ready to book your reading? I'd love to hear from you.
            </p>
          </motion.div>
        </section>

        <div className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass p-8 rounded-2xl border border-yellow-500/10">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6 font-[Cinzel]">
                ✉️ Send a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <span className="text-5xl block mb-4">✨</span>
                  <p className="text-gray-300 text-lg">Message sent successfully!</p>
                  <p className="text-gray-500 text-sm mt-2">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-yellow-500/50 transition placeholder-gray-500 resize-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-6 py-3 rounded-xl font-bold shadow-lg"
                  >
                    ✨ Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">📧 Email</h3>
              <a href="mailto:anishakumarivats7@gmail.com" className="text-gray-300 hover:text-yellow-400 transition">
                anishakumarivats7@gmail.com
              </a>
            </div>

            {/* Phone / UPI */}
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">📱 UPI Payment</h3>
              <p className="text-gray-300">7361015759@ybl</p>
              <p className="text-gray-500 text-sm mt-1">PhonePe / Google Pay</p>
            </div>

            {/* Social */}
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">🌐 Connect</h3>
              <div className="flex gap-6 text-3xl">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#ec4899" }}
                  className="text-gray-400 transition-all"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#60a5fa" }}
                  className="text-gray-400 transition-all"
                >
                  <FaTwitter />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, color: "#ef4444" }}
                  className="text-gray-400 transition-all"
                >
                  <FaYoutube />
                </motion.a>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass p-6 rounded-2xl border border-yellow-500/10">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">⏱ Response Time</h3>
              <p className="text-gray-300">
                I typically respond within <strong className="text-yellow-400">24 hours</strong>. 
                For urgent inquiries, please mention it in your message.
              </p>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;