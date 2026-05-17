import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

export default function Footer() {
  return (
    <Fragment>
      <footer className="bg-black/95 backdrop-blur-md text-yellow-400 pt-12 mt-10 border-t border-white/10">

        {/* Top Section */}
        <div className="max-w-6xl mx-auto px-6">

          {/* Logo / Brand */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-yellow-300">
              SeekViaLove
            </h1>

            <p className="text-gray-400 mt-2 text-sm">
              Tarot & Soul Guidance
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">

            {/* Company */}
            <div>
              <h3 className="mb-4 text-white font-bold">
                Company
              </h3>

              <ul className="space-y-3 text-gray-400">
                <li>
                  <NavLink
                    to="/about"
                    className="hover:text-yellow-300 transition"
                  >
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/careers"
                    className="hover:text-yellow-300 transition"
                  >
                    Careers
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/contact"
                    className="hover:text-yellow-300 transition"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-white font-bold">
                Support
              </h3>

              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Help Center
                </li>

                <li className="hover:text-yellow-300 transition cursor-pointer">
                  FAQ
                </li>

                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Community
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-white font-bold">
                Legal
              </h3>

              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Terms & Conditions
                </li>

                <li className="hover:text-yellow-300 transition cursor-pointer">
                  Privacy Policy
                </li>

                <li className="hover:text-yellow-300 transition cursor-pointer">
                  License Agreement
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="mb-4 text-white font-bold">
                Connect
              </h3>

              <div className="flex gap-4 text-2xl">

                <a
                  href="#"
                  className="hover:text-pink-500 hover:scale-110 transition-all duration-300"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="hover:text-blue-400 hover:scale-110 transition-all duration-300"
                >
                  <FaTwitter />
                </a>

                <a
                  href="#"
                  className="hover:text-red-500 hover:scale-110 transition-all duration-300"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">

            <p>
              © {new Date().getFullYear()} SeekViaLove.
              All rights reserved.
            </p>

            <p className="flex items-center gap-2 mt-3 md:mt-0">
              Made with <FaHeart className="text-red-500" />
              in India
            </p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}