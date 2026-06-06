import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const footerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Footer() {
  return (
    <Fragment>
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={footerVariants}
        className="bg-black/95 backdrop-blur-md text-yellow-400 pt-12 mt-10 border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Logo / Brand */}
          <motion.div
            variants={linkVariants}
            className="text-center mb-10"
          >
            <motion.h1
              className="text-3xl font-bold text-yellow-300"
              whileHover={{ scale: 1.05 }}
            >
              SeekViaLove
            </motion.h1>
            <p className="text-gray-400 mt-2 text-sm font-[Cinzel]">
              Tarot & Soul Guidance
            </p>
          </motion.div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
            {/* Company */}
            <motion.div variants={linkVariants}>
              <h3 className="mb-4 text-white font-bold">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li whileHover={{ x: 5 }} className="transition-all">
                  <NavLink to="/about" className="hover:text-yellow-300 transition">
                    About Us
                  </NavLink>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-all">
                  <NavLink to="/careers" className="hover:text-yellow-300 transition">
                    Careers
                  </NavLink>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-all">
                  <NavLink to="/contact" className="hover:text-yellow-300 transition">
                    Contact
                  </NavLink>
                </motion.li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={linkVariants}>
              <h3 className="mb-4 text-white font-bold">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li whileHover={{ x: 5 }} className="transition-all cursor-pointer hover:text-yellow-300">
                  Help Center
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-all cursor-pointer hover:text-yellow-300">
                  FAQ
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-all cursor-pointer hover:text-yellow-300">
                  Community
                </motion.li>
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={linkVariants}>
              <h3 className="mb-4 text-white font-bold">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <motion.li whileHover={{ x: 5 }} className="transition-all cursor-pointer hover:text-yellow-300">
                  Terms & Conditions
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-all cursor-pointer hover:text-yellow-300">
                  Privacy Policy
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="transition-all cursor-pointer hover:text-yellow-300">
                  License Agreement
                </motion.li>
              </ul>
            </motion.div>

            {/* Social */}
            <motion.div variants={linkVariants}>
              <h3 className="mb-4 text-white font-bold">Connect</h3>
              <div className="flex gap-4 text-2xl">
                <motion.a
                  href="https://www.instagram.com/seekvialove/"
                  target="_blank"
                  rel="noopener noreferrer"
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
            </motion.div>
          </div>

          {/* Bottom */}
          <motion.div
            variants={linkVariants}
            className="border-t border-gray-800 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500"
          >
            <p>© {new Date().getFullYear()} SeekViaLove. All rights reserved.</p>
            <motion.p
              className="flex items-center gap-2 mt-3 md:mt-0"
              whileHover={{ color: "#f59e0b" }}
            >
              Made with <FaHeart className="text-red-500" /> in India
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </Fragment>
  );
}