import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Navbar( { hideSignup = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/v1/checkSession");

        // Handle various response structures the backend might return
        const loggedIn = res.data?.loggedIn || false;
        if (loggedIn) {
          // Try multiple possible key names for user data
          const userData = res.data.user || res.data.data || res.data.userData || res.data.profile || null;
          const fallbackData = res.data.firstName || res.data.name || res.data.email ? res.data : null;
          const effectiveUser = userData || fallbackData;

          if (effectiveUser) {
            // Ensure role is available on the user object
            if (!effectiveUser.role) {
              // Try to get role from the top-level response
              effectiveUser.role = res.data.role || res.data.data?.role || "user";
            }
            setUser(effectiveUser);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/v1/logout");
      // Clear the stored session ID
      sessionStorage.removeItem("sessionID");
      // Force full page reload so all components properly reset session state
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return null; // or a spinner

  return (
    <Disclosure
  as="nav"
  className="
    fixed top-5 left-1/2 -translate-x-1/2
    w-[95%] max-w-7xl
    bg-gradient-to-r from-black to-orange-400/80
    backdrop-blur-md
    border border-white/10
    shadow-xl
    rounded-2xl
    px-4 py-2
    z-50
  "
>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-yellow-300 font-bold text-base sm:text-lg md:text-xl">
            SeekViaLove
            <h1 className="text-xs text-white ">Tarot & Soul Guidance</h1>
          </Link>

          {/* Mobile Hamburger Button */}
          <DisclosureButton className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </DisclosureButton>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link className="text-white hover:text-white" to="/">
              Home
            </Link>
            <Link href="#services" className="text-white hover:text-black" to="/#services">
              Services
            </Link>
            <Link className="text-white hover:text-white" to="/booking">
              Bookings
            </Link>
            {user?.role === "admin" && (
              <Link className="text-yellow-300 hover:text-yellow-200 font-semibold" to="/admin">
                ⚡ Admin
              </Link>
            )}
            <BellIcon className="h-6 w-6 text-gray-400" />

            {!user && (
  <div className="flex items-center gap-3">
    
    <Link
      to="/login"
      className="text-white hover:text-orange-200 transition"
    >
      Login
    </Link>

    {!hideSignup && (
      <Link
        to="/signup"
        className="
          bg-black/80
          px-4 py-2
          rounded-lg
          text-white
          shadow-lg
          hover:bg-black
          transition-all
        "
      >
        Signup
      </Link>
    )}
  </div>
)}

            {user && (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-2 text-white hover:opacity-80 transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    {user.firstName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden lg:inline font-semibold text-sm">
                    {user.firstName || "User"}
                  </span>
                </MenuButton>

                <MenuItems className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white font-semibold text-sm">{user.firstName} {user.lastName || ""}</p>
                    <p className="text-gray-500 text-xs truncate">{user.emailId || ""}</p>
                  </div>
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2.5 text-sm ${active ? "bg-white/10" : ""} text-white transition`}
                      >
                        👤 My Profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2.5 text-sm ${active ? "bg-red-500/10" : ""} text-red-400 transition`}
                      >
                        🚪 Logout
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="md:hidden px-4 pb-4 border-t border-white/10 mt-2 pt-3 space-y-1">
        <Link to="/" className="block py-2.5 px-3 text-white hover:bg-white/10 rounded-lg transition">
          🏠 Home
        </Link>
        <Link to="/#services" className="block py-2.5 px-3 text-white hover:bg-white/10 rounded-lg transition">
          🔮 Services
        </Link>
        <Link to="/booking" className="block py-2.5 px-3 text-white hover:bg-white/10 rounded-lg transition">
          📋 Bookings
        </Link>
        {user?.role === "admin" && (
          <Link to="/admin" className="block py-2.5 px-3 text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition font-semibold">
            ⚡ Admin
          </Link>
        )}

        <div className="border-t border-white/10 my-2 pt-2">
          {!user ? (
            <div className="space-y-1">
              <Link to="/login" className="block py-2.5 px-3 text-white hover:bg-white/10 rounded-lg transition">
                🔑 Login
              </Link>
              {!hideSignup && (
                <Link to="/signup" className="block py-2.5 px-3 text-white hover:bg-white/10 rounded-lg transition">
                  ✨ Signup
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-1">
              <Link to="/profile" className="flex items-center gap-3 py-2.5 px-3 text-white hover:bg-white/10 rounded-lg transition">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                  {user.firstName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div className="text-sm font-semibold">{user.firstName} {user.lastName || ""}</div>
                  <div className="text-xs text-gray-500">View Profile</div>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2.5 px-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}